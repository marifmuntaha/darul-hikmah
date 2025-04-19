<div class="about-us pt-130 pb-10">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="about-content">
                    <div class="section-title section-title-green mb-30">
                        <h2>{!! $page ? $page['title'] : ''!!}</h2>
                        <p style="text-align: justify">
                            {{$page ? $page['contentFirst'] : ''}}
                        </p>
                    </div>
                    <p style="text-align: justify">
                        {{$page ? $page['contentSecond'] : ''}}
                    </p>
                    <div class="about-btn mt-45">
                        <a class="default-btn" href="{{$page ? $page['link'] : ''}}">
                            {{$page ? $page['linkText'] : ''}}
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <div class="about-img default-overlay">
                    <img src="{{$page ? $page['image'] : ''}}" alt="">
                    <a class="video-btn video-popup" href="{{$page ? $page['video'] : ''}}">
                        <img class="animated" src="{{asset('assets/images/icon/video.png')}}" alt="">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
