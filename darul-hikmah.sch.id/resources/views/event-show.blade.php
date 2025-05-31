@extends('layout.master', ['page' => $event->title])
@section('content')
    <div class="event-details-area pt-130">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <div class="event-left-wrap mr-40">
                        <div class="event-description">
                            <div class="description-date-social mb-45">
                                <div class="description-date-time">
                                    <div class="description-date">
                                        <span
                                            class="event-date">{{$event->startDay()}}</span>
                                        <span>{{$event->startMonth()}}</span>
                                    </div>
                                    <div class="description-meta-wrap">
                                        <div class="description-meta">
                                            <i class="fa fa-location-arrow"></i>
                                            <span>{{$event->location}}</span>
                                        </div>
                                        <div class="description-meta">
                                            <i class="fa fa-clock-o"></i>
                                            <span>{{$event->startClock()}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="description-social-wrap">
                                    <div class="description-social">
                                        <ul>
                                            <li><a class="whatsapp" href="#"><i class="fa fa-whatsapp"></i></a></li>
                                            <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                            <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                            <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="description-btn">
                                        <a href="#"><i class="fa fa-share-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                            <img src="{{asset($event->image ?: 'assets/images/event-details.jpg')}}" alt="">
                            <h3>{{$event->title}}</h3>
                            {!! $event->content !!}
                            @if($event->gallery != null)
                                <div class="event-gallery text-center mt-40">
                                    <div class="event-gallery-active nav-style-3 owl-carousel">
                                        @php
                                            $gallery->images->map(function ($item) {
                                                print ('<img src="'.asset($item).'" alt="">');
                                            })
                                        @endphp
                                    </div>
                                    <h4>Galeri Kegiatan</h4>
                                </div>

                            @endif
                            <div class="location-area mt-80">
                                <div id="location"></div>
                            </div>
                        </div>
                    </div>
                </div>
                @include('layout.sidebar')
            </div>
        </div>
    </div>
    <div class="brand-logo-area pt-130 pb-130">
        <x-brand />
    </div>
@endsection
