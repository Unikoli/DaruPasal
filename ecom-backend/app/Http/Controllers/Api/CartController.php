<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        return response()->json(ShoppingCart::where('user_id', Auth::id())->with('product')->get());
    }
    // public function store(Request $request)

    // {
    //     $request->validate([
    //         'product_id' => 'required|exists:products,id',
    //         'quantity' => 'required|integer|min:1'
    //     ]);

    //     $cart = ShoppingCart::updateOrCreate(
    //         ['user_id' => Auth::id(), 'product_id' => $request->product_id],
    //         ['quantity' => $request->quantity]
    //     );
    //     if($cart->save())
    //     {
    //         return response()->json(['message' => 'Added to cart', 'cart' => $cart]);

    //     }
    //     else
    //     {
    //         return response()->json([
    //             'message' => 'cannot add to the cart', 'cart' => $cart
    //         ]);

    //     }

    // }
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $cart = ShoppingCart::updateOrCreate(
            ['user_id' => $userId, 'product_id' => $request->product_id],
            ['quantity' => $request->quantity]
        );

        return response()->json(['message' => 'Added to cart', 'cart' => $cart]);
    }

    public function update(Request $request, $product_id)
    {
        $cart = ShoppingCart::where('user_id', Auth::id())
            ->where('product_id', $product_id)
            ->firstOrFail();

        $cart->update(['quantity' => $request->input('quantity')]);

        return response()->json(['message' => 'Cart updated']);
    }
    public function destroy($product_id)
    {
        ShoppingCart::where('user_id', Auth::id())
            ->where('product_id', $product_id)
            ->delete();

        return response()->json(['message' => 'Item removed']);
    }

    public function clear()
    {
        $cart = ShoppingCart::where('user_id', Auth::id())->delete();

        if ($cart > 0) {
            return response()->json(['message' => 'Cart cleared']);
        } else {
            return response()->json(['message' => 'no products availabe in the cart']);
        }
    }
}
