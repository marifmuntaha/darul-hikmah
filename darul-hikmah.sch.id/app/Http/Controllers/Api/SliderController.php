<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSliderRequest;
use App\Http\Requests\UpdateSliderRequest;
use App\Models\Slider;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SliderController extends Controller
{
    public function index()
    {
        try {
            $sliders = Slider::all();
            return response([
                'result' => $sliders
            ]);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function store(StoreSliderRequest $request)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('background')) {
                $background = $request->file('background');
                $backgroundName = Str::random(16) . '.' . $background->getClientOriginalExtension();
                $backgroundPath = Storage::disk('public')->putFileAs('images/slider', $background, $backgroundName);
                $data['background'] = $backgroundPath;
            }
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = Str::random(16) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')->putFileAs('images/slider', $image, $imageName);
                $data['image'] = $imagePath;
            }
            return ($slider = Slider::create($data))
                ? response([
                    'message' => 'Slider berhasil ditambahkan.',
                    'result' => $slider
                ]) : throw new Exception("Slider gagal ditambahkan.");
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function show(Slider $slider)
    {
        return response([
            'result' => $slider
        ]);
    }

    public function update(UpdateSliderRequest $request, Slider $slider)
    {
        try {
            $data = $request->all();
            $oldBackground = $slider->background;
            $oldImage = $slider->image;
            if ($request->hasFile('background')) {
                $background = $request->file('background');
                $backgroundName = Str::random(16) . '.' . $background->getClientOriginalExtension();
                $backgroundPath = Storage::disk('public')->putFileAs('images/slider', $background, $backgroundName);
                $data['background'] = $backgroundPath;
            }
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = Str::random(16) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')->putFileAs('images/slider', $image, $imageName);
                $data['image'] = $imagePath;
            }
            if ($slider->update(array_filter($data))) {
                Storage::disk('public')->delete($oldBackground);
                Storage::disk('public')->delete($oldImage);
                return response([
                    'message' => 'Slider berhasil diperbarui.',
                    'result' => $slider
                ]);
            } else {
                throw new Exception("Slider gagal ditambahkan.");
            }
        } catch (Exception $e) {
            isset($backgroundPath) && Storage::disk('public')->delete($backgroundPath);
            isset($imagePath) && Storage::disk('public')->delete($imagePath);
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function destroy(Slider $slider)
    {
        try {
            if ($slider->delete()) {
                Storage::disk('public')->delete($slider->background);
                Storage::disk('public')->delete($slider->image);
                return response([
                    'message' => 'Slider berhasil dihapus.',
                    'result' => $slider
                ]);
            } else {
                throw new Exception("Slider gagal dihapus.");
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
