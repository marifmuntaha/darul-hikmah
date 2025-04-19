<?php

namespace App\Http\Controllers;

use App\Models\Event;
//use Illuminate\Http\Request;

class EventController extends Controller
{
    public array $data;

    public function index()
    {
        $this->data['meta'] = [
            ['name' => 'title', 'content' => 'Semua Kegiatan Yayasan Darul Hikmah Menganti'],
            ['name' => 'desc', 'content' => 'Semua Kegiatan Yayasan Darul Hikmah Menganti Kedung Jepara'],
            ['name' => 'keyword', 'content' => 'portal, portal resmi, portal yayasan, portal yayasan darul hikmah, portal yayasan darul hikmah menganti, artikel, berita, acara, pengumuman']
        ];
        $this->data['events'] = Event::orderBy('start', 'DESC')->paginate(6);
        return view('event', $this->data);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        $this->data['meta'] = [
            ['name' => 'title', 'content' => $event->title],
            ['name' => 'desc', 'content' => substr($event->content, 0, 50)],
            ['name' => 'keyword', 'content' => 'portal, portal resmi, portal yayasan, portal yayasan darul hikmah, portal yayasan darul hikmah menganti, artikel, berita, acara, pengumuman']
        ];
        $this->data['event'] = $event;
        $this->data['gallery'] = $event->gallery;
        return view('event-show', $this->data);
    }
}
