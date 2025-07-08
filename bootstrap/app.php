<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up', // health check endpoint for server uptime
    )

    ->withMiddleware(function (Middleware $middleware): void {
        // Web middleware group
        $middleware->web(
            append: [
                \App\Http\Middleware\HandleInertiaRequests::class,
                \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            ],

            // ❗️ Uncomment the following to remove CSRF protection (NOT RECOMMENDED in production)
            // exclude: [
            //     \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
            // ]
        );

        // You can also define API or global middleware here if needed:
        // $middleware->api([...]);
        // $middleware->global([...]);
    })

    ->withExceptions(function (Exceptions $exceptions): void {
        // Customize how exceptions are reported or rendered here if needed
        // Example:
        // $exceptions->renderable(function (Throwable $e, $request) {
        //     return response()->json(['message' => $e->getMessage()], 500);
        // });
    })

    ->create();
