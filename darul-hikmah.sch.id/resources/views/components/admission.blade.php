<div class="admission-area pt-125 pb-130 bg-img-position" style="background-image:url({{asset('assets/images/bg-5.png')}}">
    <div class="container">
        <div class="admission-title text-center pb-60">
            <h2>{{$page['title']}}</h2>
            <p>{{$page['description']}} </p>
            <div class="apply-btn">
                <a class="default-btn" href="#">DAFTAR SEKARANG</a>
            </div>
        </div>
        <div class="tab-content jump">
            <div class="tab-pane active" id="course-categorie-1">
                <div class="course-slider-active-2 nav-style-1 owl-carousel">
                    @if($widget->count() > 0)
                        @for($i=0; $i<$widget->count(); $i++)
                            <div class="course-categorie-bundle">
                                <div class="single-course mb-30">
                                    <div class="course-img">
                                        <a href="{{$widget[$i]['link']}}"><img src="{{asset($widget[$i]['image'])}}" alt=""></a>
                                    </div>
                                    <div class="course-content course-content-2">
                                        <h4><a href="{{$widget[$i]['link']}}">{{$widget[$i]['title']}}</a></h4>
                                        <p>{{$widget[$i]['description']}}</p>
                                    </div>
                                </div>
                            </div>
                        @endfor
                    @endif
                </div>
            </div>
            <div class="view-all text-center mt-20">
                <a class="default-btn" href="#">LIHAT SEMUA</a>
            </div>
        </div>
    </div>
</div>
