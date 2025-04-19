<div class="course-area bg-img pt-130">
    <div class="container">
        <div class="section-title mb-75 course-mrg-small">
            <h2> {!! $page['title'] !!}</h2>
            <p>{{$page['description']}} </p>
        </div>
        <div class="course-slider-active-3">
            @for($i=0; $i < $widget->count(); $i++)
                <div class="single-course">
                    <div class="course-img">
                        <a href="{{$widget[$i]['link']}}">
                            <img class="animated" src="{{asset($widget[$i]['image'])}}" alt="">
                        </a>
                    </div>
                    <div class="course-content">
                        <h4><a href="{{$widget[$i]['link']}}">{{$widget[$i]['title']}}</a></h4>
                        <p>{{$widget[$i]['description']}}</p>
                    </div>
                    <div class="course-position-content">
                        <div class="course-btn">
                            <a class="default-btn" href="{{$widget[$i]['link']}}">KUNJUNGI</a>
                        </div>
                    </div>
                </div>
            @endfor
        </div>
    </div>
</div>
