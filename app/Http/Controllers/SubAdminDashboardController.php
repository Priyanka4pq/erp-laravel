<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubAdminDashboardController extends Controller
{
     public function index(){
        return Inertia::render('subadmin/SubAdminDashboard');
        }
}
