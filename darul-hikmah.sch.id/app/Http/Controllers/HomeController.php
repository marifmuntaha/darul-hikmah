<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    protected array $data;

    public function index()
    {
        $this->data['meta'] = [
            ['name' => 'title', 'content' => 'Portal Yayasan Darul Hikmah Menganti'],
            ['name' => 'desc', 'content' => 'Portal Resmi Yayasan Darul Hikmah Menganti Kedung Jepara'],
            ['name' => 'keyword', 'content' => 'portal, portal resmi, portal yayasan, portal yayasan darul hikmah, portal yayasan darul hikmah menganti']
        ];
        return view('home', $this->data);
    }
}
