<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class TestCloudinaryController extends Controller
{
    public function test()
    {
        $config = [
            'cloud_name' => Config::get('cloudinary.cloud'),
            'api_key' => Config::get('cloudinary.key'),
            'api_secret' => Config::get('cloudinary.secret'),
            'secure' => Config::get('cloudinary.secure'),
        ];

        return response()->json($config);
    }
} 