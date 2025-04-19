<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public array $data;

    public function History()
    {
        $this->data['meta'] = [
            ['name' => 'title', 'content' => 'Sejarah Yayasan Darul Hikmah Menganti'],
            ['name' => 'desc', 'content' => 'Sejarah Resmi Yayasan Darul Hikmah Menganti Kedung Jepara'],
            ['name' => 'keyword', 'content' => 'portal, portal resmi, portal yayasan, portal yayasan darul hikmah, portal yayasan darul hikmah menganti']
        ];

        return view('page.history', $this->data);
    }
}
