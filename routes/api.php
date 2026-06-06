<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\CallDispositionController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Agents
Route::prefix('agents')->group(function () {
    Route::get('/', [AgentController::class, 'index']);
    Route::get('/{id}', [AgentController::class, 'show']);
    Route::patch('/{id}/status', [AgentController::class, 'updateStatus']);
    Route::get('/{id}/statistics', [AgentController::class, 'statistics']);
});

// Calls
Route::prefix('calls')->group(function () {
    Route::get('/', [CallController::class, 'index']);
    Route::post('/', [CallController::class, 'store']);
    Route::get('/active', [CallController::class, 'activeCalls']);
    Route::get('/missed', [CallController::class, 'missedCalls']);
    Route::get('/{id}', [CallController::class, 'show']);
    Route::patch('/{id}', [CallController::class, 'update']);
});

// Dashboard
Route::prefix('dashboard')->group(function () {
    Route::get('/overview', [DashboardController::class, 'overview']);
    Route::get('/live-stats', [DashboardController::class, 'liveStats']);
    Route::get('/agent-performance', [DashboardController::class, 'agentPerformance']);
});

// Reports
Route::prefix('reports')->group(function () {
    Route::get('/call-volume', [ReportController::class, 'callVolume']);
    Route::get('/agent-performance', [ReportController::class, 'agentPerformance']);
    Route::get('/disposition-summary', [ReportController::class, 'dispositionSummary']);
    Route::post('/export', [ReportController::class, 'export']);
});

// Customers
Route::prefix('customers')->group(function () {
    Route::get('/', [CustomerController::class, 'index']);
    Route::post('/', [CustomerController::class, 'store']);
    Route::get('/{id}', [CustomerController::class, 'show']);
    Route::patch('/{id}', [CustomerController::class, 'update']);
});

// Call Dispositions
Route::prefix('dispositions')->group(function () {
    Route::get('/', [CallDispositionController::class, 'index']);
    Route::post('/', [CallDispositionController::class, 'store']);
    Route::patch('/{id}', [CallDispositionController::class, 'update']);
});
