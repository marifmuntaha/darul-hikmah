@if($isRecent)
    <div class="related-slider-active related-blog-slide pb-80">
        @foreach($articles as $article)
            <div class="single-blog">
                <div class="blog-img">
                    <a href="{{route('article.show', $article->slug)}}">
                        <img
                            src="{{$article->placeholder?: asset('assets/images/blog-placeholder.jpg')}}"
                            alt="">
                    </a>
                </div>
                <div class="blog-content-wrap">
                    <span>{{$article->category->name}}</span>
                    <div class="blog-content">
                        <h4>
                            <a href="{{route('article.show', $article->slug)}}">{{substr($article->title, 0, 50)}}</a>
                        </h4>
                        <p style="text-align: justify">{!! substr(strip_tags($article->content), 0, 225) !!}</p>
                        <div class="blog-meta">
                            <ul>
                                <li><a href="#"><i class="fa fa-user"></i>{{substr($article->user->name, 0, 15)}}</a></li>
                                <li><a href="#"><i class="fa fa-comments-o"></i> {{$article->comments->count()}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="blog-date">
                        <a href="#"><i class="fa fa-calendar-o"></i> {{$article->createdAt()}}</a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
@elseif($isSidebar)
    <div class="recent-post-wrap">
        @foreach($articles as $article)
            <div class="single-recent-post">
                <div class="recent-post-img">
                    <a href="{{route('article.show', $article->slug)}}">
                        <img src="{{$article->placeholder ?: asset('assets/images/blog-placeholder.jpg')}}" alt="">
                    </a>
                </div>
                <div class="recent-post-content">
                    <h5><a href="{{route('article.show', $article->slug)}}">{{substr($article->title, 0, 50)}}</a></h5>
                    <span>{{$article->category->name}}</span>
                </div>
            </div>
        @endforeach
    </div>
@else
    <div class="blog-area pt-130 pb-100">
        <div class="container">
            <div class="section-title mb-75">
                <h2>Berita <span>Terbaru</span></h2>
                <p>Berita, Kegiatan, Acara terbaru dari Yayasan Darul Hikmah Menganti</p>
            </div>
            <div class="row">
                @foreach($articles as $post)
                    <div class="col-lg-3 col-md-6">
                        <div class="single-blog mb-30">
                            <div class="blog-img">
                                <a href="{{route('article.show', $post->slug)}}">
                                    <img src="{{$post->placeholder?: asset('assets/images/blog-placeholder.jpg')}}" alt="">
                                </a>
                            </div>
                            <div class="blog-content-wrap">
                                <span>{{$post->category->name}}</span>
                                <div class="blog-content">
                                    <h4><a href="{{route('article.show', $post->slug)}}">{{substr($post->title, 0, 20)}}</a></h4>
                                    <p style="text-align: justify">{!! substr(strip_tags($post->content), 0, 195)!!}</p>
                                    <div class="blog-meta">
                                        <ul>
                                            <li><a href="#"><i class="fa fa-user"></i> {{substr($post->user->name, 0, 15)}}</a></li>
                                            <li><a href="#"><i class="fa fa-comments-o"></i> {{$post->comments->count()}}</a></li>
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
        </div>
    </div>
@endif
