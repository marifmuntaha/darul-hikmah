@extends('layout.master', ['page' => 'Semua Berita'])
@section('content')
    <div class="event-area pt-130 pb-130">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <div class="blog-all-wrap mr-40">
                        <div class="row">
                            @foreach($articles as $post)
                                <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="single-blog mb-30">
                                        <div class="blog-img">
                                            <a href="{{route('article.show', $post->slug)}}">
                                                <img src="{{$post->placeholder ?: asset('assets/images/blog-placeholder.jpg')}}" alt="{{$post->slug}}">
                                            </a>
                                        </div>
                                        <div class="blog-content-wrap">
                                            <span>{{$post->category->name}}</span>
                                            <div class="blog-content">
                                                <h4>
                                                    <a href="{{route('article.show', $post->slug)}}">{{substr($post->title, 0, 20)}}</a>
                                                </h4>
                                                <p style="text-align: justify">{!! substr(strip_tags($post->content), 0, 250) !!}</p>
                                                <div class="blog-meta">
                                                    <ul>
                                                        <li>
                                                            <a href="{{route('article', ['author' => $post->user->id])}}">
                                                                <i class="fa fa-user"></i>{{substr($post->user->name, 0, 10)}}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i class="fa fa-comments-o"></i> {{$post->comments()->count()}}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="blog-date">
                                                <a href="#"><i class="fa fa-calendar-o"></i> {{$post->createdAt()}}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        @if($articles->lastPage() > 1)
                            <div class="pro-pagination-style text-center mt-25">
                                <ul>
                                    <li><a class="prev" href="{{$articles->url(1)}}"><i class="fa fa-angle-double-left"></i></a></li>
                                    @for($i=1;$i<$articles->lastPage();$i++)
                                        <li><a class="{{$articles->currentPage() == $i ? 'active' : null}}" href="{{$articles->url($i)}}">{{$i}}</a></li>
                                    @endfor
                                    <li><a class="next" href="{{$articles->url($articles->currentPage() + 1)}}"><i class="fa fa-angle-double-right"></i></a></li>
                                </ul>
                            </div>
                        @endif
                    </div>
                </div>
                @include('layout.sidebar')
            </div>
        </div>
    </div>
    <div class="brand-logo-area pb-130">
        <x-brand/>
    </div>
@endsection
