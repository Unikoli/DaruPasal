<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'recaptcha_token' => ['required']
        ]);
        // Verify reCAPTCHA
        $response = Http::asForm()->post(env("GOOGLE_RECAPTCHA_URL"), [
            'secret' => env("GOOGLE_RECAPTCHA_SECRET"),
            'response' => $request->recaptcha_token,
            'remoteip' => $request->ip(),
        ]);

        $data=$response->json();
        if (!$data['success']) {
            return response()->json(['message' => 'reCAPTCHA verification failed.'], 422);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'user'; // optional, default role

        if ($user->save()) {
            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
            ], 201);
        } else {
            return response()->json(['message' => 'Failed to register user'], 500);
        }
    }

    public function login(Request $request)
    {
        // Validate credentials and reCAPTCHA token
        $validatedData = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            // 'recaptcha_token' => ['required']
        ]);

        // Verify reCAPTCHA
        // $response = Http::asForm()->post(env("GOOGLE_RECAPTCHA_URL"), [
        //     'secret' => env("GOOGLE_RECAPTCHA_SECRET"),
        //     'response' => $request->recaptcha_token,
        //     'remoteip' => $request->ip(),
        // ]);

        // Log the response for debugging
        // Log::info('reCAPTCHA env', [
        //     'url' => env('GOOGLE_RECAPTCHA_URL'),
        //     'secret' => env('GOOGLE_RECAPTCHA_SECRET'),
        // ]);
        
        // $data = $response->json();

        // Ensure $data is an array before logging
        // Log::info('reCAPTCHA response:', is_array($data) ? $data : ['response' => $data]);


        // Check if $data is null or if 'success' is not set
        // if (!$data || !isset($data['success']) || !$data['success']) {
        //     return response()->json(['message' => 'reCAPTCHA verification failed.',], 422);
        // }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => $user->role,
            'message' => 'login success!'
        ]);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
