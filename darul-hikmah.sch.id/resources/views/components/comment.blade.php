<div class="blog-comment">
    <div class="blog-comment-btn mb-80 commrnt-toggle">
        <a href="#">LIHAT KOMENTAR</a>
    </div>
    <div class="blog-comment-content-wrap">
        <h4>KOMENTAR</h4>
        @foreach($comments as $comment)
            <div class="single-blog-comment">
                <div class="blog-comment-img">
                    <img src="{{asset('assets/images/article/blog-comment.jpg')}}" alt="">
                </div>
                <div class="blog-comment-content">
                    <h5>{{$comment->name}}</h5>
                    <p style="text-align: justify">{{$comment->content}}</p>
                </div>
            </div>
            @foreach($children as $child)
                @if($comment->id == $child->parent)
                    <div class="single-blog-comment child-comment">
                        <div class="blog-comment-img">
                            <img src="{{asset('assets/images/article/blog-comment.jpg')}}" alt="">
                        </div>
                        <div class="blog-comment-content">
                            <h5>{{$child->name}}</h5>
                            <p style="text-align: justify">{{$child->content}}</p>
                        </div>
                    </div>
                @endif
            @endforeach
        @endforeach
    </div>
</div>
<div class="leave-comment-area">
    <h3>Tinggalkan Komentar</h3>
    <form method="post">
        @csrf
        <div class="row">
            <div class="col-lg-6">
                <div class="leave-form">
                    <input type="text" name="comment_name" placeholder="Nama">
                </div>
            </div>
            <div class="col-lg-6">
                <div class="leave-form">
                    <input type="email" name="comment_email" placeholder="Email">
                </div>
            </div>
            <div class="col-lg-12">
                <div class="leave-form leave-btn">
                    <textarea name="comment_content" placeholder="Pesan"></textarea>
                    <input type="submit" name="submit" value="KIRIM">
                </div>
            </div>
        </div>
    </form>
</div>
