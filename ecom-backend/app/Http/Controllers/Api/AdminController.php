<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json([
            'success' => true,
            'message' => 'Order status updated.',
            'data' => $order
        ]);
    }
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
