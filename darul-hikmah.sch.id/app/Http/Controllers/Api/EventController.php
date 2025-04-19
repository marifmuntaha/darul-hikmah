<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index(Request $request)
    {
        try {
            $events = new Event();
            if ($request->has('dashboard')) {
                return response([
                    'result' => $this->dashboard()
                ]);
            }
            $events->orderBy('created_at', 'desc');
            return response([
                'result' => $events->get(),
            ]);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function store(StoreEventRequest $request)
    {
        try {
            $data = $request->all();
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')->putFileAs('images/events', $image, $imageName);
                $data['image'] = $imagePath;
            }
            if ($request->hasFile('placeholder')) {
                $placeholder = $request->file('placeholder');
                $placeholderName = Str::random(20) . '.' . $placeholder->getClientOriginalExtension();
                $placeholderPath = Storage::disk('public')->putFileAs('images/events', $placeholder, $placeholderName);
                $data['placeholder'] = $placeholderPath;
            }
            return ($event = Event::create($data))
                ? response([
                    'message' => 'Kegiatan berhasil ditambahkan.',
                    'result' => $event,
                ]) : throw new Exception('Gagal menambahkan kegiatan.');
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(Event $event)
    {
        return response([
            'result' => $event,
        ]);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        try {
            $data = $request->all();
            $oldImage = $event->image;
            $oldPlaceholder = $event->placeholder;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')->putFileAs('images/events', $image, $imageName);
                $data['image'] = $imagePath;
            }
            else {
                $data['image'] = null;
            }
            if ($request->hasFile('placeholder')) {
                $placeholder = $request->file('placeholder');
                $placeholderName = Str::random(20) . '.' . $placeholder->getClientOriginalExtension();
                $placeholderPath = Storage::disk('public')->putFileAs('images/events', $placeholder, $placeholderName);
                $data['placeholder'] = $placeholderPath;
            }
            else {
                $data['placeholder'] = null;
            }
            if ($event->update(array_filter($data))) {
                isset($data['image']) && Storage::disk('public')->delete($oldImage);
                isset($data['placeholder']) && Storage::disk('public')->delete($oldPlaceholder);
                return response([
                    'message' => 'Kegiatan berhasil diperbarui.',
                    'result' => $event,
                ]);
            } else {
                throw new Exception('Gagal memperbarui kegiatan.');
            }
        } catch (Exception $e) {
            isset($data['image']) && Storage::disk('public')->delete($data['image']);
            isset($data['placeholder']) && Storage::disk('public')->delete($data['placeholder']);
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function destroy(Event $event)
    {
        try {
            if ($event->delete()) {
                Storage::disk('public')->delete($event->image);
                Storage::disk('public')->delete($event->placeholder);
                return response([
                    'message' => 'Kegiatan berhasil dihapus.',
                    'result' => $event,
                ]);
            } else {
                throw new Exception('Gagal menghapus kegiatan.');
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    protected function dashboard(): array
    {
        $events = new Event();
        $periods = now()->subMonths(10)->monthsUntil(now());
        $months = collect([]);
        $event = collect([]);
        foreach ($periods as $item) {
            $months[] = collect([
                'month' => $item->shortMonthName,
                'year' => $item->year,
            ]);
            $event[] = $events->whereMonth('created_at', $item->month)
                ->whereYear('created_at', $item->year)->count();
        }
        return [
            'months' => $months->map(function ($item) {
                return $item['month'].' '. $item['year'];
            }),
            'events' => $event,
            'total' => $events->get()->count()
        ];
    }
}
