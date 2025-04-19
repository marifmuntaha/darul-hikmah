<div class="choose-us section-padding-1">
    <div class="container-fluid">
        <div class="row no-gutters choose-negative-mrg">
            @for($i=0; $widget->count() > $i; $i++)
                <div class="col-lg-3 col-md-6">
                    <div class="single-choose-us {{$color[$i]}}">
                        <div class="choose-img">
                            <img class="animated" src="{{asset($widget[$i]['image'])}}" alt="">
                        </div>
                        <div class="choose-content">
                            <h3>{{$widget[$i]['title']}}</h3>
                            <p>{{$widget[$i]['content']}}</p>
                        </div>
                    </div>
                </div>
            @endfor
        </div>
    </div>
</div>
