<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::all();
            return response()->json([
                'result' => $users,
            ]);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function store(StoreUserRequest $request) {
        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = Str::random(30) . '.' . $file->getClientOriginalExtension();
                $filePath = Storage::disk('public')->putFileAs('images/user', $file, $fileName);
                $data['image'] = $filePath;
            }
            return ($user = User::create($data))
                ? response([
                    'message' => 'Pengguna baru berhasil ditambahkan.',
                    'result' => $user,
                ], 201) : throw new Exception('Pengguna baru tidak berhasil ditambahkan');
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                $oldImage = $user->image;
                $file = $request->file('image');
                $fileName = Str::random(30) . '.' . $file->getClientOriginalExtension();
                $filePath = Storage::disk('public')->putFileAs('images/user', $file, $fileName);
                $data['image'] = $filePath;
            }
            if ($user->update(array_filter($data))) {
                isset($oldImage) && Storage::disk('public')->delete($oldImage);
                return response([
                    'message' => 'Pengguna berhasil diperbarui.',
                    'result' => $user,
                ]);
            } else {
                throw new Exception('Pengguna gagal diperbarui');
            }
        } catch (Exception $e) {
            isset($filePath) && Storage::disk('public')->delete($filePath);
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function destroy(User $user)
    {
        try {
            if ($user->delete()) {
                Storage::disk('public')->delete($user->image);
                return response([
                    'message' => 'Pengguna berhasil dihapus.',
                    'result' => $user,
                ]);
            } else {
                throw new Exception('Pengguna gagal dihapus');
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
