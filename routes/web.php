<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Super\AddSubAdminController;
use App\Http\Controllers\Super\PermissionController;
use App\Http\Controllers\Super\SupperAdminDashboardController;
use App\Http\Controllers\SubAdminDashboardController;

// ---------------- Simple Test POST Routes ----------------
Route::post('/ping', function () {
    return response()->json(['message' => 'pong']);
});

Route::post('/test-post', function () {
    return response()->json(['message' => 'CSRF bypassed']);
});

// ---------------- Super Admin Routes ----------------
Route::prefix('supper')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\SupperAdminDashboardController::class, 'index'])->name('supper.dashboard.index');
    Route::get('addsubadmin', [AddSubAdminController::class, 'index'])
        ->name('supper.addsubadmin.index'); // Inertia page
    Route::post('add-subadmin', [AddSubAdminController::class, 'store'])->name('supper.adduser.store');
    Route::put('update-subadmin/{id}', [AddSubAdminController::class, 'update'])->name('supper.update-subadmin');
    Route::get('fetch-subadmin', [AddSubAdminController::class, 'show'])->name('supper.subadmin.show');
    Route::get('permission', [PermissionController::class, 'index']); // Inertia page
    Route::post('permission', [PermissionController::class, 'store']);
    Route::get('permission-list', [PermissionController::class, 'fetch']);
    Route::put('permission/{id}', [PermissionController::class, 'update']);
    Route::delete('permission/{id}', [PermissionController::class, 'destroy']);
});


// ---------------- Sub Admin Routes ----------------
Route::prefix('subadmin')->group(function () {
    Route::get('dashboard', [SubAdminDashboardController::class, 'index'])
        ->name('subadmin.dashboard.index');
});

// ---------------- CSRF Token Test Route ----------------
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});

