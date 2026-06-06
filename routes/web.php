<?php

use Illuminate\Support\Facades\Route;

// Main application route - serves React app
Route::get('/', function () {
    return view('app');
});

// TEMPORARY: Disabled catch-all route to test API functionality
// TODO: Re-enable SPA routing after fixing API routes issue
// Route::get('/{any}', function () {
//     return view('app');
// })->where('any', '.*');
