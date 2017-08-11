<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    	if (isset($_SERVER['HTTP_ORIGIN'])) {

    		$permit = false;

            switch ($_SERVER['HTTP_ORIGIN']) {
                case 'http://localhost:4200':
                    $permit = true;
                break;
                case 'http://fullstack.app':
                    $permit = true;
                break;
            }

            if ($permit == true) {
                return $next($request)
                    ->header('Access-Control-Allow-Origin', $_SERVER['HTTP_ORIGIN'])
                    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            } else {
                return $next($request);
            }

        } else {
            return $next($request);
        }
    }
}