<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShippingInfo;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function index()
    {
       return response()->json(ShippingInfo::all());
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'nullable|string|max:255',
            'phone'       => 'nullable|string|max:20',
            'email'       => 'nullable|email|max:255',
            'province'    => 'nullable|string|max:255',
            'city'        => 'nullable|string|max:255',
            'fulladdress' => 'nullable|string|max:500',
            'user_id'=>'nullable'
        ]);
    
        $data['user_id'] = auth()->id();
        $shippingInfo = ShippingInfo::create($data);
    
        return response()->json([
            'message' => 'Shipping info saved successfully.',
            'data' => $shippingInfo
        ], 201);
    }
    
}
