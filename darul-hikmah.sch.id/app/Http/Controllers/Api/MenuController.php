<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuRequest;
use App\Models\Menu;
use Exception;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        try {
            $menus = Menu::all();
            return response([
                'result' => $menus,
            ]);
        } catch (Exception $exception) {
            return response([
                'error' => $exception->getMessage(),
            ], 400);
        }
    }

    public function store(StoreMenuRequest $request)
    {
        try {
            return ($menu = Menu::create($request->all()))
                ? response([
                    'message' => 'Menu berhasil ditambahkan.',
                    'result' => $menu,
                ]) : throw new Exception("Menu gagal ditambahkan.");
        } catch (Exception $exception) {
            return response([
                'error' => $exception->getMessage(),
            ], 400);
        }
    }

    public function update(StoreMenuRequest $request, Menu $menu)
    {
        try {
            return $menu->update(array_filter($request->all()))
                ? response([
                    'message' => 'Menu berhasil diubah.',
                    'result' => $menu,
                ]) : throw new Exception("Menu gagal diubah.");
        } catch (Exception $exception) {
            return response([
                'error' => $exception->getMessage(),
            ], 400);
        }
    }

    public function destroy(Menu $menu)
    {
        try {
            return $menu->delete()
                ? response([
                    'message' => 'Menu berhasil dihapus.',
                    'result' => $menu,
                ]) : throw new Exception("Menu gagal dihapus.");
        } catch (Exception $exception) {
            return response([
                'error' => $exception->getMessage(),
            ], 400);
        }
    }
}
