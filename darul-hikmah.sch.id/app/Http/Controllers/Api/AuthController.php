<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLoginRequest;
use App\Http\Requests\StoreResetRequest;
use App\Models\User;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(StoreLoginRequest $request)
    {
        try {
            return ($status = Auth::attempt($request->all())) ?
                response([
                    'message' => 'Berhasil masuk, anda akan dialihkan dalam 2 detik.',
                    'result' => Arr::collapse([$request->user()->toArray(), [
                        'token' => $request->user()->createToken($request->email)->plainTextToken,
                    ]])
                ]) : throw new AuthenticationException('Nama pengguna/kata sandi salah.');
        } catch (AuthenticationException $exception) {
            return response([
                'message' => $exception->getMessage(),
                'result' => null
            ], 401);
        }
    }

    public function forgetPassword(Request $request)
    {
        try {
            $request->validate(['email' => 'required|email']);;
            $status = Password::sendResetLink($request->only('email'));
            return $status === Password::ResetLinkSent
                ? response([
                    'message' => __($status),
                    'result' => $status
                ]) : throw new Exception(__($status));
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function resetPassword(StoreResetRequest $request)
    {
        try {
            $status = Password::reset(
                $request->all(),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));
                    $user->save();
                }
            );
            return $status === Password::PasswordReset
                ? response([
                    'message' => __($status),
                ]) : throw new Exception(__($status));
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function logout(Request $request)
    {
        try {
            return ($status = $request->user('sanctum')->currentAccessToken()->delete())
            ? response([
                'message' => 'Berhasil keluar.',
            ]) : throw new Exception(__($status));
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

}
