<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contactus;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contactus::all());
    }
    public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'nullable|string|max:255',
        'email' => 'nullable|email|max:255',
        'message' => 'nullable|string|max:1000',
    ]);

    $contact = Contactus::create($data);

    return response()->json([
        'message' => 'Message sent successfully.',
        'data' => $contact,
    ], 201);
}
}
