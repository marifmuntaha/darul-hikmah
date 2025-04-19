@extends('layout.master', ['page' => 'Kegiatan'])
@section('content')
    <div class="event-area pt-130 pb-130">
        <div class="container">
            <div class="row">
                @foreach($events as $event)
                    <div class="col-lg-4 col-md-6">
                        <div class="single-event mb-55 event-gray-bg">
                            <div class="event-img">
                                <a href="{{route('event.show', $event->id)}}">
                                    <img
                                        src="{{$event->placeholder ?: asset('assets/images/event-placeholder.jpg')}}"
                                        alt="">
                                </a>
                                <div class="event-date-wrap">
                                    <span class="event-date">{{$event->startDay()}}</span>
                                    <span>{{$event->startMonth()}}</span>
                                </div>
                            </div>
                            <div class="event-content">
                                <h3><a href="{{route('event.show', $event->id)}}">{{substr($event->title, 0, 25)}}</a>
                                </h3>
                                <p>{!! substr($event->content, 0, 100) !!}</p>
                                <div class="event-meta-wrap">
                                    <div class="event-meta">
                                        <i class="fa fa-location-arrow"></i>
                                        <span>{{$event->location}}</span>
                                    </div>
                                    <div class="event-meta">
                                        <i class="fa fa-clock-o"></i>
                                        <span>{{$event->startClock()}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            @if($events->lastPage() > 1)
                <div class="pro-pagination-style text-center mt-25">
                    <ul>
                        <li><a class="prev" href="{{$events->url(1)}}"><i class="fa fa-angle-double-left"></i></a></li>
                        @for($i=1;$i<$events->lastPage();$i++)
                            <li><a class="{{$events->currentPage() == $i ? 'active' : null}}"
                                   href="{{$events->url($i)}}">{{$i}}</a></li>
                        @endfor
                        <li><a class="next" href="{{$events->url($events->currentPage() + 1)}}"><i
                                    class="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            @endif
        </div>
    </div>
    <div class="brand-logo-area pb-130">
        <x-brand/>
    </div>
@endsection
