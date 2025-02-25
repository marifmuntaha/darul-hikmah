@extends('layout.master', ['page' => $post->title])
@section('content')
    <div class="event-area pt-130 pb-130">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <div class="blog-details-wrap mr-40">
                        <div class="blog-details-top">
                            <img
                                src="{{asset($post->image ?: 'assets/images/article/blog-details.jpg')}}"
                                alt="">
                            <div class="blog-details-content-wrap">
                                <div class="b-details-meta-wrap">
                                    <div class="b-details-meta">
                                        <ul>
                                            <li><i class="fa fa-calendar-o"></i> {{$post->created_at}}</li>
                                            <li><i class="fa fa-user"></i> {{$post->user->name}}</li>
{{--                                            <li><i class="fa fa-comments-o"></i> {{$post->comment->count()}}</li>--}}
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
                                                <li><a class="whatsapp" href="whatsapp://send?text={{route('article.show', $post->id)}}">
                                                        <i class="fa fa-whatsapp"></i>
                                                    </a>
                                                </li>
                                                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                                <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a>
                                                </li>
                                                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                                <li><a class="google" href="#"><i class="fa fa-google-plus"></i></a>
                                                </li>
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
                                <img src="{{asset($post->user->image?:'assets/images/article/author.jpg')}}" alt="">
                            </div>
                            <div class="author-content">
                                <div class="author-content-top">
                                    <div class="blog-designation">
                                        <h5>{{strtoupper($post->user->name)}}</h5>
                                        <span>Penulis</span>
                                    </div>
                                    <div class="author-social">
                                        <ul>
                                            <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                            <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                            <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <p>{{$post->user->desc}}</p>
                            </div>
                        </div>
                        <div class="related-course pt-70">
                            <div class="related-title mb-45">
                                <h3>Artikel Terkait</h3>
                            </div>
{{--                            <div class="related-slider-active related-blog-slide pb-80">--}}
{{--                                @foreach($post_recents as $post_recent)--}}
{{--                                    <div class="single-blog">--}}
{{--                                        <div class="blog-img">--}}
{{--                                            <a href="{{route('article.detail', $post_recent->post_id)}}">--}}
{{--                                                <img--}}
{{--                                                    src="{{asset($post_recent->post_image == null ? 'assets/fronted/img/blog/blog-1.jpg' : $post_recent->post_image)}}"--}}
{{--                                                    alt="">--}}
{{--                                            </a>--}}
{{--                                        </div>--}}
{{--                                        <div class="blog-content-wrap">--}}
{{--                                            <span>{{\App\Models\Category::name($post_recent->post_category)}}</span>--}}
{{--                                            <div class="blog-content">--}}
{{--                                                <h4>--}}
{{--                                                    <a href="{{route('article.detail', $post_recent->post_id)}}">{{$post_recent->post_title}}</a>--}}
{{--                                                </h4>--}}
{{--                                                {!! substr($post_recent->post_content, 0, 200) !!}--}}
{{--                                                <div class="blog-meta">--}}
{{--                                                    <ul>--}}
{{--                                                        <li><a href="#"><i--}}
{{--                                                                    class="fa fa-user"></i>{{$post_recent->user->user_name}}--}}
{{--                                                            </a></li>--}}
{{--                                                        <li><a href="#"><i--}}
{{--                                                                    class="fa fa-comments-o"></i> {{$post_recent->comment->count()}}--}}
{{--                                                            </a></li>--}}
{{--                                                    </ul>--}}
{{--                                                </div>--}}
{{--                                            </div>--}}
{{--                                            <div class="blog-date">--}}
{{--                                                <a href="#"><i class="fa fa-calendar-o"></i> {{$post->created_at}}</a>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                @endforeach--}}
{{--                            </div>--}}
                        </div>
{{--                        @if($post->post_comment == 1)--}}
{{--                            <div class="blog-comment">--}}
{{--                                <div class="blog-comment-btn mb-80 commrnt-toggle">--}}
{{--                                    <a href="#">LIHAT KOMENTAR</a>--}}
{{--                                </div>--}}
{{--                                <div class="blog-comment-content-wrap">--}}
{{--                                    <h4>KOMENTAR</h4>--}}
{{--                                    @foreach($post->comment as $comment)--}}
{{--                                        <div class="single-blog-comment">--}}
{{--                                            <div class="blog-comment-img">--}}
{{--                                                <img src="{{asset('assets/fronted/img/blog/blog-comment.jpg')}}" alt="">--}}
{{--                                            </div>--}}
{{--                                            <div class="blog-comment-content">--}}
{{--                                                <h5>{{$comment->comment_name}}</h5>--}}
{{--                                                <p style="text-align: justify">{{$comment->comment_content}}</p>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                        @if(\App\Models\Comment::parent($comment->comment_id)->count() > 0)--}}
{{--                                            @php--}}
{{--                                                $parent = \App\Models\Comment::parent($comment->comment_id)->get()--}}
{{--                                            @endphp--}}
{{--                                            <div class="single-blog-comment child-comment">--}}
{{--                                                <div class="blog-comment-img">--}}
{{--                                                    <img src="{{asset('assets/fronted/img/blog/blog-comment.jpg')}}"--}}
{{--                                                         alt="">--}}
{{--                                                </div>--}}
{{--                                                <div class="blog-comment-content">--}}
{{--                                                    <h5>{{$parent[0]->comment_name}}</h5>--}}
{{--                                                    <p style="text-align: justify">{{$parent[0]->comment_content}}</p>--}}
{{--                                                </div>--}}
{{--                                            </div>--}}
{{--                                        @endif--}}
{{--                                    @endforeach--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                            <div class="leave-comment-area">--}}
{{--                                <h3>Tinggalkan Komentar</h3>--}}
{{--                                <form method="post" action="{{route('article.detail', $post->post_id)}}">--}}
{{--                                    @csrf--}}
{{--                                    <div class="row">--}}
{{--                                        <div class="col-lg-6">--}}
{{--                                            <div class="leave-form">--}}
{{--                                                <input type="text" name="comment_name" placeholder="Nama">--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                        <div class="col-lg-6">--}}
{{--                                            <div class="leave-form">--}}
{{--                                                <input type="email" name="comment_email" placeholder="Email">--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                        <div class="col-lg-12">--}}
{{--                                            <div class="leave-form leave-btn">--}}
{{--                                                <textarea name="comment_content" placeholder="Pesan"></textarea>--}}
{{--                                                <input type="submit" name="submit" value="KIRIM">--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                </form>--}}
{{--                            </div>--}}
{{--                        @endif--}}
                    </div>
                </div>
                @include('layout.sidebar')
            </div>
        </div>
    </div>
@endsection
