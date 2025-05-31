<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VisitorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $visitor = new Visitor();
        if ($visitor->whereIp($request->ip())->exists()) {
            if ($visitor->whereIp($request->ip())->latest()->first()->expired()) {
                Visitor::create([
                    'ip' => $request->ip(),
                    'visited_at' => date('Y-m-d H:i:s')
                ]);
            }
        }
        else {
            Visitor::create([
                'ip' => $request->ip(),
                'visited_at' => date('Y-m-d H:i:s')
            ]);
        }

        return $next($request);
    }
}
