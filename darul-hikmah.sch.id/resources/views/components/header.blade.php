<header class="header-area">
    <div class="header-top bg-img">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-7 col-12 col-sm-8">
                    <div class="header-contact">
                        <ul>
                            <li><i class="fa fa-phone"></i> {{$phone}}</li>
                            <li><i class="fa fa-envelope-o"></i><a href="mailto:{{$email}}">{{$email}}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-6 col-md-5 col-12 col-sm-4">
                    <div class="login-register">
                        <ul>
                            <li><a class="whatsapp" target="_blank" href="{{$whatsapp}}"><i class="fa fa-whatsapp"></i></a></li>
                            <li><a class="instagram" target="_blank" href="{{$instagram}}"><i class="fa fa-instagram"></i></a></li>
                            <li><a class="youtube" target="_blank" href="{{$youtube}}"><i class="fa fa-youtube-play"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="header-bottom sticky-bar clearfix">
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-md-6 col-4">
                    <div class="logo">
                        <a href="{{route('home')}}">
                            <img alt="" src="{{$logo}}" style="width: 200px">
                        </a>
                    </div>
                </div>
                <div class="col-lg-10 col-md-6 col-8">
                    <div class="menu-cart-wrap">
                        <div class="main-menu">
                            <nav>
                                <ul>
                                    @foreach($parents as $parent)
                                        <li>
                                            <a href="{{$parent->link}}"> {{$parent->name}} @if($parent->child)<i class="fa fa-angle-down"></i>@endif</a>
                                            @if($parent->child)
                                                <ul class="submenu">
                                                    @foreach($children as $child)
                                                        @if($child->parent == $parent->id)
                                                            <li><a href="{{$child->link}}">{{$child->name}}</a></li>
                                                        @endif
                                                    @endforeach
                                                </ul>
                                            @endif
                                        </li>
                                    @endforeach
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-area">
                <div class="mobile-menu">
                    <nav id="mobile-menu-active">
                        <ul>
                            @foreach($parents as $parent)
                                <li>
                                    <a href="{{$parent->link}}"> {{$parent->name}} @if($parent->child)<i class="fa fa-angle-down"></i>@endif</a>
                                    @if($parent->child)
                                        <ul class="submenu">
                                            @foreach($children as $child)
                                                @if($child->parent == $parent->id)
                                                    <li><a href="{{$child->link}}">{{$child->name}}</a></li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</header>
