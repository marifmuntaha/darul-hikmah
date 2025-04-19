<div class="course-area bg-img pt-130 pb-10" style="background-image:url({{$page['background']}});">
    <div class="container">
        <div class="section-title mb-75">
            <h2>{!! $page['title'] !!}</h2>
            <p>{{$page['description']}}</p>
        </div>
        <div class="course-slider-active nav-style-1 owl-carousel">
            @for($i=0;$i<$carousel->count();$i++)
                <div class="single-course">
                    <div class="course-img">
                        <a href="{{$carousel[$i]['link']}}"><img class="animated" src="{{asset($carousel[$i]['image'])}}" alt=""></a>
                        <span>{{$carousel[$i]['subtitle']}}</span>
                    </div>
                    <div class="course-content">
                        <h4><a href="{{$carousel[$i]['link']}}">{{$carousel[$i]['title']}}</a></h4>
                        <p>{{$carousel[$i]['description']}}</p>
                    </div>
                    <div class="course-position-content">
                        <div class="course-btn">
                            <a class="default-btn" href="{{$carousel[$i]['link']}}">Kunjungi</a>
                        </div>
                    </div>
                </div>
            @endfor
        </div>
    </div>
</div>
