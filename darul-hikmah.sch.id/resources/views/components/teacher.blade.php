@if($teachers)
    <div class="teacher-area pt-130 pb-100">
        <div class="container">
            <div class="section-title mb-75">
                <h2>Pengurus  <span>Yayasan</span></h2>
                <p>Pengurus Yayasan Darul Hikmah Menganti Kedung Jepara</p>
            </div>
            <div class="custom-row">
                @foreach($teachers as $teacher)
                    <div class="custom-col-5">
                        <div class="single-teacher mb-30">
                            <div class="teacher-img">
                                <img src="{{asset($teacher->image)}}" alt="">
                            </div>
                            <div class="teacher-content-visible">
                                <h4>{{$teacher->name}}</h4>
                                <h5>{{$teacher->job}}</h5>
                            </div>
                            <div class="teacher-content-wrap">
                                <div class="teacher-content">
                                    <h4>{{$teacher->name}}</h4>
                                    <h5>Pengurus</h5>
                                    <p>{{$teacher->job}}</p>
                                    <div class="teacher-social">
                                        <ul>
                                            <li><a class="facebook" href="{{$teacher->facebook}}"><i class="fa fa-whatsapp"></i></a></li>
                                            <li><a class="youtube" href="{{$teacher->youtube}}"><i class="fa fa-facebook"></i></a></li>
                                            <li><a class="twitter" href="{{$teacher->twitter}}"><i class="fa fa-twitter"></i></a></li>
                                            <li><a class="instagram" href="{{$teacher->instagram}}"><i class="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

@endif
