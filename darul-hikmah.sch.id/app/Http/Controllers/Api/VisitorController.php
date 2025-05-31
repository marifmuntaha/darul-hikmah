<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Exception;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function index(Request $request)
    {
        try {
            $visitors = new Visitor();
            $periods = now()->subMonths(10)->monthsUntil(now());
            $months = collect([]);
            $visitor = [];
            foreach ($periods as $item) {
                $months[] = collect([
                    'month' => $item->shortMonthName,
                    'year' => $item->year,
                ]);
                $visitor[] = $visitors->whereMonth('created_at', $item->month)
                    ->whereYear('created_at', $item->year)->count();
            }
            if ($request->has('dashboard')) {
                return response([
                    'result' => [
                        'months' => $months->map(function ($item) {
                            return $item['month'].' '. $item['year'];
                        }),
                        'visitors' => $visitor,
                        'total' => $visitors->get()->count(),
                    ]
                ]);
            } else {
                throw new Exception('Data tidak ditemukan');
            }
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
