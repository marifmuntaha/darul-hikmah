<div class="teacher-area pt-130 pb-10">
    <div class="container">
        <div class="section-title mb-75">
            <h2>{!! $page['title'] !!}</h2>
            <p>{{$page['description']}}</p>
        </div>
        @if($widget->count() > 0)
            <div class="custom-row">
                @for($i=0; $i<$widget->count(); $i++)
                    <div class="custom-col-5">
                        <div class="single-teacher mb-30">
                            <div class="teacher-img">
                                <img src="{{asset($widget[$i]['image'])}}" alt="">
                            </div>
                            <div class="teacher-content-visible">
                                <h4>{{$widget[$i]['name']}}</h4>
                                <h5>{{$widget[$i]['job']}}</h5>
                            </div>
                            <div class="teacher-content-wrap">
                                <div class="teacher-content">
                                    <h4>{{$widget[$i]['name']}}</h4>
                                    <h5>Pengurus</h5>
                                    <p>{{$widget[$i]['job']}}</p>
                                    <div class="teacher-social">
                                        <ul>
                                            <li><a class="facebook" href="#"><i class="fa fa-whatsapp"></i></a></li>
                                            <li><a class="youtube" href="#"><i class="fa fa-facebook"></i></a></li>
                                            <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                            <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        @endif
    </div>
</div>
