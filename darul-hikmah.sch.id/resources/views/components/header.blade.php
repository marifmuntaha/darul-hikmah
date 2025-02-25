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
                                    <li><a href="{{route('home')}}"> BERANDA </a></li>
                                    <li>
                                        <a href="#"> PROFIL <i class="fa fa-angle-down"></i> </a>
                                        <ul class="submenu">
                                            <li><a href="{{route('article.show', 1)}}">Sejarah Darul Hikmah</a></li>
                                            <li><a href="{{route('article.show', 2)}}">Visi & Misi</a></li>
                                            <li><a href="{{route('article.show', 3)}}">Struktur Organisasi</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#"> JENJANG<i class="fa fa-angle-down"></i> </a>
                                        <ul class="submenu">
                                            <li><a target="_blank" href="https://paudra.darul-hikmah.sch.id">RAUDHATUL ATHFAL</a></li>
                                            <li><a target="_blank" href="https://mi.darul-hikmah.sch.id">MADRASAH IBTIDAIYAH</a></li>
                                            <li><a target="_blank" href="https://mts.darul-hikmah.sch.id">MADRASAH TSANAWIYAH</a></li>
                                            <li><a target="_blank" href="https://ma.darul-hikmah.sch.id">MADRASAH ALIYAH</a></li>
                                            <li><a target="_blank" href="https://ponpes.darul-hikmah.sch.id">PONDOK PESANTREN</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="{{route('event')}}"> KEGIATAN </a></li>
                                    <li><a href="{{route('article')}}"> BERITA </a></li>
                                    <li><a href="{{route('contact')}}"> KONTAK </a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobile-menu-area">
                <div class="mobile-menu">
                    <nav id="mobile-menu-active">
                        <ul class="menu-overflow">
                            <li><a href="{{route('home')}}"> BERANDA </a></li>
                            <li>
                                <a href="#"> PROFIL <i class="fa fa-angle-down"></i> </a>
                                <ul class="submenu">
                                    <li><a href="{{route('article.show', 1)}}">Sejarah Darul Hikmah</a></li>
                                    <li><a href="{{route('article.show', 2)}}">Visi & Misi</a></li>
                                    <li><a href="{{route('article.show', 3)}}">Struktur Organisasi</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"> JENJANG<i class="fa fa-angle-down"></i> </a>
                                <ul class="submenu">
                                    <li><a target="_blank" href="https://ra.darul-hikmah.sch.id">RAUDHATUL ATHFAL</a></li>
                                    <li><a target="_blank" href="https://mi.darul-hikmah.sch.id">MADRASAH IBTIDAIYAH</a></li>
                                    <li><a target="_blank" href="https://mts.darul-hikmah.sch.id">MADRASAH TSANAWIYAH</a></li>
                                    <li><a target="_blank" href="https://ma.darul-hikmah.sch.id">MADRASAH ALIYAH</a></li>
                                    <li><a target="_blank" href="https://ponpes.darul-hikmah.sch.id">PONDOK PESANTREN</a></li>
                                </ul>
                            </li>
                            <li><a href="{{route('event')}}"> ACARA </a></li>
                            <li><a href="{{route('article')}}"> BERITA </a></li>
                            <li><a href="{{route('contact')}}"> KONTAK </a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</header>
