<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EsewaController extends Controller
{
    /**
     * Initiate a payment for a product
     */
    // public function preparePayment(Request $request)
    // {
    //     // $request->validate([
    //     //     'product_id' => 'required|exists:products,id',
    //     //     'quantity' => 'nullable|integer|min:1'
    //     // ]);

    //     $product = Product::findOrFail($request->product_id);
    //     // dd($product);
    //     $quantity = $request->input('quantity', 1);
    //     $user = Auth::user();

    //     $amount = $product->price * $quantity;
    //     $tax = $amount * 0.10;
    //     $total = $amount + $tax;

    //     $transaction_uuid = now()->timestamp;
    //     $message = "total_amount=$total,transaction_uuid=$transaction_uuid,product_code=EPAYTEST";
    //     $secret = '8gBm/:&EnhH.1/q'; // Your actual eSewa secret key
    //     $signature = base64_encode(hash_hmac('sha256', $message, $secret, true));

    //     // Create order
    //     $order = Order::create([
    //         'user_id' => $user->id,
    //         'status' => 'pending',
    //     ]);

    //     // Attach order item
    //     OrderItem::create([
    //         'order_id' => $order->id,
    //         'product_id' => $product->id,
    //         'quantity' => $quantity,
    //         'price' => $product->price,
    //     ]);

    //     // Create payment record
    //     Payment::create([
    //         'order_id' => $order->id,
    //         'transaction_uuid' => $transaction_uuid,
    //         'amount' => $amount,
    //         'tax_amount' => $tax,
    //         'total_amount' => $total,
    //         'product_code' => 'EPAYTEST',
    //         'status' => 'pending',
    //     ]);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Payment initialized. Redirect to eSewa.',
    //         'redirect_url' => 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
    //         'data' => [
    //             "amount" => $amount,
    //             "tax_amount" => $tax,
    //             "total_amount" => $total,
    //             "product_delivery_charge" => "0",
    //             "product_service_charge" => "0",
    //             "product_code" => "EPAYTEST",
    //             "transaction_uuid" => $transaction_uuid,
    //             "success_url" => route('esewa.success'),
    //             "failure_url" => route('esewa.failure'),
    //             "signature" => $signature,
    //             "signed_field_names" => "total_amount,transaction_uuid,product_code"
    //         ]
    //     ]);
    // }

    public function preparePayment(Request $request)
    {
        // Validate the request to make sure the cart data is coming in as expected
        $request->validate([
            'cart' => 'required|array',
            'cart.*.product_id' => 'required|exists:products,id',
            'cart.*.quantity' => 'nullable|integer|min:1',
        ]);

        $user = Auth::user();
        $totalAmount = 0;
        $transactionUuid = now()->timestamp;

        // Create an order
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        // Loop through each product in the cart and process it
        foreach ($request->cart as $item) {
            $product = Product::findOrFail($item['product_id']);
            $quantity = $item['quantity'] ?? 1;  // Default quantity to 1 if not provided

            $amount = $product->price * $quantity;
            $tax = $amount * 0.10;
            $totalAmount += $amount + $tax; // Add the total amount to the total

            // Attach the order items
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        // Calculate the total, tax, and other charges
        $taxAmount = $totalAmount * 0.10;
        $total = $totalAmount + $taxAmount;

        // Create payment record
        Payment::create([
            'order_id' => $order->id,
            'transaction_uuid' => $transactionUuid,
            'amount' => $totalAmount,
            'tax_amount' => $taxAmount,
            'total_amount' => $total,
            'product_code' => 'EPAYTEST',
            'status' => 'pending',
        ]);

        // eSewa signature generation
        $message = "total_amount=$total,transaction_uuid=$transactionUuid,product_code=EPAYTEST";
        $secret = '8gBm/:&EnhH.1/q'; // Your actual eSewa secret key
        $signature = base64_encode(hash_hmac('sha256', $message, $secret, true));

        // Prepare the response
        return response()->json([
            'success' => true,
            'message' => 'Payment initialized. Redirect to eSewa.',
            'redirect_url' => 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
            'data' => [
                "amount" => $totalAmount,
                "tax_amount" => $taxAmount,
                "total_amount" => $total,
                "product_delivery_charge" => "0",
                "product_service_charge" => "0",
                "product_code" => "EPAYTEST",
                "transaction_uuid" => $transactionUuid,
                "success_url" => route('esewa.success'),
                "failure_url" => route('esewa.failure'),
                "signature" => $signature,
                "signed_field_names" => "total_amount,transaction_uuid,product_code"
            ]
        ]);
    }

    /**
     * Handle eSewa payment success callback
     */
    public function success(Request $request)
    {

        if (!$request->has('data')) {
            return response()->json([
                'success' => false,
                'message' => 'Missing data parameter in callback.',
            ], 400);
        }

        try {
            $decoded = base64_decode($request->data);
            $data = json_decode($decoded, true);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to decode data.',
                'error' => $e->getMessage(),
            ], 400);
        }

        if (!isset($data['status']) || $data['status'] !== 'COMPLETE') {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or incomplete payment.',
                'raw_data' => $data
            ], 400);
        }

        // proceed as normal...


        $decoded = base64_decode($request->data);
        $data = json_decode($decoded, true);

        if (!isset($data['status']) || $data['status'] !== 'COMPLETE') {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or incomplete payment.'
            ], 404);
        }

        $payment = Payment::where('transaction_uuid', $data['transaction_uuid'])->first();

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment record not found.'
            ], 404);
        }

        if ($payment->status === 'complete') {
            return response()->json([
                'success' => true,
                'message' => 'Payment already completed.',
                'data' => $payment
            ], 400);
        }

        // $payment->update(['status' => 'complete']);
        // $payment->order->update(['status' => 'completed']);
        // Update the payment status using the `save()` method
        // $payment->status = 'complete';
        // $payment->save();  // This will update the payment in the database

        // // Update the order status using the `save()` method on the related order model
        // $payment->order->status = 'completed';
        // $payment->order->save();  // This will update the related order status
        // Update the payment status using DB query builder
        // DB::table('payments')
        //     ->where('id', $payment->id)
        //     ->update(['status' => 'complete']);

        // // Update the related order status using DB query builder
        // DB::table('orders')
        //     ->where('id', $payment->order_id)
        //     ->update(['status' => 'completed']);
           // Update the payment status using updateOrCreate (conditional update)
    

        //    $payment->status = 'complete';
        //    $payment->save();
           
        //    $order = $payment->order;
        //    $order->status = 'completed';
        //    $order->save();
        $payment->status = 'complete';
        $payment->save();
        
        if ($payment->order) {
            $payment->order->status = 'completed';
            $payment->order->save();
        } else {
            Log::error('Order not found for payment ID: ' . $payment->id);
        }
        
   

        return response()->json([
            'success' => true,
            'message' => 'Payment completed successfully.',
            'data' => $payment
        ], 400);
    }

    /**
     * Handle eSewa payment failure
     */
    public function failure(Request $request)
    {
        return response()->json([
            'success' => false,
            'message' => 'Payment was cancelled or failed.'
        ]);
    }

    /**
     * Get all orders for logged-in user
     */
    public function userOrders()
    {
        $orders = Auth::user()
            ->order()
            ->with(['items.product', 'payment'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Fetched your orders.',
            'data' => $orders
        ]);
    }

    /**
     * Admin route to view all orders
     */
    public function adminOrders()
    {
        $orders = Order::with(['user', 'items.product', 'payment'])->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Fetched all orders.',
            'data' => $orders
        ]);
    }
}
