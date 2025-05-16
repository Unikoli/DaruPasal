<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EsewaController extends Controller
{
    public function preparePayment(Request $request)
    {
        $request->validate([
            'cart' => 'required|array',
            'cart.*.product_id' => 'required|exists:products,id',
            'cart.*.quantity' => 'nullable|integer|min:1',
        ]);

        $user = Auth::user();
        $totalAmount = 0;
        $transactionUuid = now()->timestamp;

        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        foreach ($request->cart as $item) {
            $product = Product::findOrFail($item['product_id']);
            $quantity = $item['quantity'] ?? 1;
            $amount = $product->price * $quantity;
            $tax = $amount * 0.10;
            $totalAmount += $amount + $tax;

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
            ]);
        }

        $taxAmount = $totalAmount * 0.10;
        $total = $totalAmount + $taxAmount;

        Payment::create([
            'order_id' => $order->id,
            'transaction_uuid' => $transactionUuid,
            'amount' => $totalAmount,
            'tax_amount' => $taxAmount,
            'total_amount' => $total,
            'product_code' => 'EPAYTEST',
            'status' => 'pending',
        ]);

        $message = "total_amount=$total,transaction_uuid=$transactionUuid,product_code=EPAYTEST";
        $secret = '8gBm/:&EnhH.1/q'; // Replace with your real key
        $signature = base64_encode(hash_hmac('sha256', $message, $secret, true));

        $payload = [
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
        ];

        return response()->json([
            'success' => true,
            'message' => 'Payment initialized.',
            'redirect_url' => 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
            'data' => $payload,
        ]);
    }

    public function success(Request $request)
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
        $data = $request->query('data') ?? $request->input('data');

        if (!$data) {
            return redirect()->to($frontendUrl . '/payment/error');
        }

        try {
            $decoded = base64_decode($data);
            $parsed = json_decode($decoded, true);
        } catch (\Exception $e) {
            return redirect()->to($frontendUrl . '/payment/error');
        }

        $transaction_uuid = $parsed['transaction_uuid'] ?? null;
        $transaction_code = $parsed['transaction_code'] ?? null;
        $status = $parsed['status'] ?? null;
        $total_amount = $parsed['total_amount'] ?? null;

        if (!$transaction_uuid || !$transaction_code || !$status || !$total_amount) {
            return redirect()->to($frontendUrl . '/payment/error');
        }

        if (strtoupper($status) === 'COMPLETE') {
            $payment = Payment::where('transaction_uuid', $transaction_uuid)->first();
            if ($payment && strtolower($payment->status) === 'pending') {
                $payment->status = 'completed';
                $payment->save();

                if ($payment->order) {
                    $payment->order->status = 'completed';
                    $payment->order->save();
                }
            }
            return redirect()->to($frontendUrl . '/payment/success');
        } else {
            return redirect()->to($frontendUrl . '/payment/error');
        }
    }

    public function failure(Request $request)
    {
        return response()->json([
            'success' => false,
            'message' => 'Payment failed or was cancelled.'
        ]);
    }

    public function userOrders()
    {
        $orders = Auth::user()
            ->orders()
            ->with(['items.product', 'payment'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Fetched orders.',
            'orders' => $orders
        ]);
    }
}
