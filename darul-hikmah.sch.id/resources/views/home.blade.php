@extends('layout.master', ['page' => 'Beranda'])
@section('content')
{{--    <x-frontend.slider />--}}
{{--    <x-frontend.home.choose-us />--}}
{{--    <x-frontend.home.about-us />--}}
{{--    <x-frontend.home.course-area />--}}
{{--    <x-frontend.home.achievement />--}}
    <div class="register-area bg-img pt-130 pb-130"
         style="background-image:url({{asset('storage/images/home/bg-2.jpg')}});">
        <div class="container">
            <div class="section-title-2 mb-75 white-text">
                <h2>Daftar <span>Sekarang</span></h2>
                <p>Penerimaan Peserta Didik Baru (PPDB) Tahun Pelajaran 2025/2026 Jenjang PAUD, RA, MI, MTs dan MA</p>
            </div>
            <div class="register-wrap">
                <div id="register-3" class="mouse-bg">
                    <div class="winter-banner">
                        <img src="{{asset('storage/images/home/regi-1.png')}}" alt="">
                        <div class="winter-content">
                            <span>TAHUN PELAJARAN </span>
                            <h3>24/25</h3>
                            <span>PENDAFTARAN </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-10 col-md-8">
                        <div class="register-form">
                            <h4>Masukkan Informasi Anda</h4>
                            <form>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="contact-form-style mb-20">
                                            <input name="name" placeholder="Nama Lengkap" type="text">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="contact-form-style mb-20">
                                            <input name="name" placeholder="Tempat Tanggal Lahir" type="text">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="contact-form-style mb-20">
                                            <input name="name" placeholder="Nomor Handphone" type="text">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="contact-form-style mb-20">
                                            <input name="name" placeholder="Email" type="text">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="contact-form-style">
                                            <textarea name="message" placeholder="Pesan Singkat"></textarea>
                                            <button class="submit default-btn" type="submit">KIRIM SEKARANG</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="register-1" class="mouse-bg"></div>
        <div id="register-2" class="mouse-bg"></div>
    </div>
    <x-teacher/>
    <div class="event-area bg-img default-overlay pt-130 pb-130"
         style="background-image:url({{asset('storage/images/home/bg-3.jpg')}});">
        <div class="container">
            <div class="section-title mb-75">
                <h2><span>Agenda</span> Mendatang</h2>
                <p>Agenda, Kegiatan & Acara Mendatang di Yayasan Darul Hikmah Menganti</p>
            </div>
{{--            <div class="event-active owl-carousel nav-style-1">--}}
{{--                @foreach($events as $event)--}}
{{--                    <div class="single-event event-white-bg">--}}
{{--                        <div class="event-img">--}}
{{--                            <a href="{{route('event.detail', $event->event_id)}}">--}}
{{--                                <img--}}
{{--                                    src="{{asset($event->event_image == null ? 'assets/fronted/img/event/event.jpg' : $event->event_image)}}"--}}
{{--                                    alt="">--}}
{{--                            </a>--}}
{{--                            <div class="event-date-wrap">--}}
{{--                                <span class="event-date">{{$event->date_start('d')}}</span>--}}
{{--                                <span>{{$event->date_star('m')}}</span>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="event-content">--}}
{{--                            <h3><a href="{{route('event.detail', $event->event_id)}}">{{$event->event_name}}</a></h3>--}}
{{--                            <p>{{substr($event->event_content, 0, 50)}}</p>--}}
{{--                            <div class="event-meta-wrap">--}}
{{--                                <div class="event-meta">--}}
{{--                                    <i class="fa fa-location-arrow"></i>--}}
{{--                                    <span>{{$event->event_place}}</span>--}}
{{--                                </div>--}}
{{--                                <div class="event-meta">--}}
{{--                                    <i class="fa fa-clock-o"></i>--}}
{{--                                    <span>{{$event->event_time}}</span>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                @endforeach--}}
{{--            </div>--}}
        </div>
    </div>
    <div class="blog-area pt-130 pb-100">
        <div class="container">
            <div class="section-title mb-75">
                <h2>Berita <span>Terbaru</span></h2>
                <p>Berita, Kegiatan, Acara terbaru dari Yayasan Darul Hikmah Menganti</p>
            </div>
{{--            <div class="row">--}}
{{--                @foreach($posts as $post)--}}
{{--                    <div class="col-lg-3 col-md-6">--}}
{{--                        <div class="single-blog mb-30">--}}
{{--                            <div class="blog-img">--}}
{{--                                <a href="{{route('article.detail', $post->post_id)}}">--}}
{{--                                    <img--}}
{{--                                        src="{{asset($post->post_image == null ? 'assets/fronted/img/blog/blog-1.jpg' : $post->post_image)}}"--}}
{{--                                        alt="">--}}
{{--                                </a>--}}
{{--                            </div>--}}
{{--                            <div class="blog-content-wrap">--}}
{{--                                <span>{{\App\Models\Category::name($post->post_category)}}</span>--}}
{{--                                <div class="blog-content">--}}
{{--                                    <h4><a href="{{route('article.detail', $post->post_id)}}">{{$post->post_title}}</a>--}}
{{--                                    </h4>--}}
{{--                                    {!! substr($post->post_content, 0, 200)!!}--}}
{{--                                    <div class="blog-meta">--}}
{{--                                        <ul>--}}
{{--                                            <li><a href="#"><i class="fa fa-user"></i> {{$post->user->user_name}}</a>--}}
{{--                                            </li>--}}
{{--                                            <li><a href="#"><i class="fa fa-comments-o"></i> {{$post->comment->count()}}--}}
{{--                                                </a></li>--}}
{{--                                        </ul>--}}
{{--                                    </div>--}}
{{--                                </div>--}}
{{--                                <div class="blog-date">--}}
{{--                                    <a href="#"><i class="fa fa-calendar-o"></i> {{$post->created_at()}}</a>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                @endforeach--}}
{{--            </div>--}}
        </div>
    </div>
@endsection
