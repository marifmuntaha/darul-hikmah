<div class="breadcrumb-area">
    <div class="breadcrumb-top default-overlay bg-img breadcrumb-overly-3 pt-100 pb-95" style="background-image:url({{asset($background ?: 'assets/images/breadcrumb-bg-1.jpg')}});">
        <div class="container">
            <h2>{{$title}}</h2>
            <p>{{$description}}</p>
        </div>
    </div>
    <div class="breadcrumb-bottom">
        <div class="container">
            <ul>
                <li><a href="{{route('home')}}">Beranda</a> <span><i class="fa fa-angle-double-right"></i>{{$title}}</span></li>
            </ul>
        </div>
    </div>
</div>
