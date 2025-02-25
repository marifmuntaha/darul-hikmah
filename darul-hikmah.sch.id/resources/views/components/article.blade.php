<div class="recent-post-wrap">
    @foreach($articles as $article)
        <div class="single-recent-post">
            <div class="recent-post-img">
                <a href="{{route('article.show', $article->id)}}">
                    <img src="{{asset($article->image ? $article->image : 'assets/fronted/img/blog/blog-1.jpg')}}" alt="">
                </a>
            </div>
            <div class="recent-post-content">
                <h5><a href="{{route('article.show', $article->id)}}">{{substr($article->title, 0, 50)}}</a></h5>
                <span>{{$article->category->name}}</span>
            </div>
        </div>
    @endforeach
</div>
