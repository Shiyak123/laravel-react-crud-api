<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
public function login(Request $request)
{

    $credentials = $request->validate([

        'email' => 'required|email',

        'password' => 'required'

    ]);



    if(!$token = auth('api')->attempt($credentials)){

        return response()->json([

            'message' => 'Invalid credentials'

        ],401);

    }



    return response()->json([

        'message' => 'Login successful',

        'token' => $token,

        'user' => auth('api')->user()

    ]);

}

}
