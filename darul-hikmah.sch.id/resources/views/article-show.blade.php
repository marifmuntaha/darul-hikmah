@extends('layout.master', ['page' => $post->title])
@section('content')
    <div class="event-area pb-130">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <div class="blog-details-wrap mr-40">
                        <div class="blog-details-top">
                            <img src="{{$post->image}}" alt="">
                            <div class="blog-details-content-wrap">
                                <div class="b-details-meta-wrap">
                                    <div class="b-details-meta">
                                        <ul>
                                            <li><i class="fa fa-calendar-o"></i> {{$post->createdAt()}}</li>
                                            <li><i class="fa fa-user"></i> {{$post->user->name}}</li>
                                            <li><i class="fa fa-comments-o"></i> {{$post->comments()->count()}}</li>
                                        </ul>
                                    </div>
                                    <span>{{$post->category->name}}</span>
                                </div>
                                <h3>{{$post->title}}</h3>
                                {!! $post->content !!}
                                <div class="blog-share-tags">
                                    <div class="blog-share">
                                        <div class="blog-btn">
                                            <a href="#"><i class="fa fa-share-alt"></i></a>
                                        </div>
                                        <div class="blog-social">
                                            <ul>
                                                <li><a class="whatsapp" href="whatsapp://send?text={{route('article.show', $post->slug)}}">
                                                        <i class="fa fa-whatsapp"></i>
                                                    </a>
                                                </li>
                                                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                                <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="blog-tag">
                                        <ul>
                                            @foreach($post->tags()->get() as $item)
                                                <li><a href="{{route('article', ['tag' => $item->id])}}">{{$item->name}}</a></li>
                                            @endforeach
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="blog-author mt-80">
                            <div class="author-img">
                                <img src="{{asset($post->user->image?:'assets/images/user.jpg')}}" alt="">
                            </div>
                            <div class="author-content">
                                <div class="author-content-top">
                                    <div class="blog-designation">
                                        <h5>{{strtoupper($post->user->name)}}</h5>
                                        <span>Penulis</span>
                                    </div>
                                    <div class="author-social">
                                        <ul>
                                            <li><a class="facebook" href="{{$post->user->facebook}}"><i class="fa fa-facebook"></i></a></li>
                                            <li><a class="instagram" href="{{$post->user->instagram}}"><i class="fa fa-instagram"></i></a></li>
                                            <li><a class="twitter" href="{{$post->user->twitter}}"><i class="fa fa-twitter"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <p>{{$post->user->about}}</p>
                            </div>
                        </div>
                        <div class="related-course pt-70">
                            <div class="related-title mb-45">
                                <h3>Artikel Terkait</h3>
                            </div>
                            <x-article :is-recent="true" :category="$post->category_id"/>
                        </div>
                        @if($post->comment == '1')
                            <x-comment :comments="$post->comments()->get()" />
                        @endif
                    </div>
                </div>
                @include('layout.sidebar')
            </div>
        </div>
    </div>
    <div class="brand-logo-area pb-130">
        <x-brand />
    </div>
@endsection
