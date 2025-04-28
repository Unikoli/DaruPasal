<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EsewaController extends Controller
{
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
            'status' => 'complete',
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
                "failure_url" => env('FRONTEND_URL', 'http://localhost:5173') . '/Payment/error',
                "signature" => $signature,
                "signed_field_names" => "total_amount,transaction_uuid,product_code"
            ]
        ]);
    }

    
    public function success(Request $request)
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');

        // Step 1: Retrieve the 'data' parameter from the request (query or input)
        $data = $request->query('data') ?? $request->input('data');

        // Test if 'data' is missing, redirect to error page if not found
        if (!$data) {
            Log::warning('No data received in the request');
            return redirect()->to($frontendUrl . '/payment/error');
        }

        // Step 2: Try to decode and parse the 'data' received
        try {
            $decoded = base64_decode($data);
            $parsed = json_decode($decoded, true);
            
            // Log the parsed data for debugging
            Log::info('Decoded and parsed data', $parsed);
        } catch (\Exception $e) {
            return redirect()->to($frontendUrl . '/payment/error');
        }

        // Step 3: Check if the required fields are present in the parsed data
        $transaction_uuid = $parsed['transaction_uuid'] ?? null;
        $transaction_code = $parsed['transaction_code'] ?? null;
        $status = $parsed['status'] ?? null;
        $total_amount = $parsed['total_amount'] ?? null;

        // If any required field is missing, redirect to error page
        if (!$transaction_uuid || !$transaction_code || !$status || !$total_amount) {
            Log::warning('Missing required fields in parsed data', ['parsed' => $parsed]);
            return redirect()->to($frontendUrl . '/payment/error');
        }

        // Step 4: Check if the payment is successful (status = COMPLETE)
        if (strtoupper($status) === 'COMPLETE') {
            // Retrieve the payment based on transaction UUID
            $payment = Payment::where('transaction_uuid', $transaction_uuid)->first();

            // Log the payment status check
            Log::info('Found payment for transaction_uuid', ['payment_status' => $payment->status]);

            if ($payment && strtolower($payment->status) === 'pending') {
                // Update the payment status to completed
                $payment->status = 'completed';
                $payment->save();

                // Update the order status to completed
                if ($payment->order) {
                    $payment->order->status = 'completed';
                    $payment->order->save();
                }

            }

            // Step 5: Redirect to frontend with a success message
            return redirect()->to($frontendUrl . '/payment/success');
        } else {
            // If the payment is not successful, redirect to the error page
            Log::warning('Payment not complete, status: ' . $status);
            return redirect()->to($frontendUrl . '/payment/error');
        }
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
            ->orders()
            ->with(['items.product', 'payment'])
            ->latest()
            ->get();
        

        return response()->json([
            'success' => true,
            'message' => 'Fetched your orders.',
            'orders' => $orders
        ]);
    }
}
