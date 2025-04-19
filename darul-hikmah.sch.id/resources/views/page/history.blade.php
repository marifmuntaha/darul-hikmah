@extends('layout.master', ['page' => 'Sejarah Darul Hikmah'])
@section('content')
    <x-breadcrumb title="Sejarah Darul Hikmah" description="Sejarah berdirinya Yayasan Darul Hikmah Menganti"/>
    <div class="event-area pt-130 pb-130">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <div class="blog-details-wrap mr-40">
                        <div class="blog-details-top">
                            <img src="{{asset('assets/images/article/blog-details.jpg')}}" alt="">
                            <div class="blog-details-content-wrap">
                                <div class="b-details-meta-wrap">
                                    <div class="b-details-meta">
                                        <ul>
                                            <li><i class="fa fa-calendar-o"></i> 26 Januari 2024</li>
                                            <li><i class="fa fa-user"></i> Administrator</li>
                                        </ul>
                                    </div>
                                    <span>Sejarah</span>
                                </div>
                                <h3>Sejarah Berdirinya Yayasan Darul Hikmah Menganti</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                                <blockquote>
                                    <i class="quote-top fa fa-quote-left"></i>
                                    Lorem ipsum dolor sit amet, conse ctetur adipi sicing elit, sed do eiusm od tempor incidi dunt ut labore et dolore magna aliqua. Ut enim  fugiat nulla pariaatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
                                    <i class="quote-bottom fa fa-quote-right"></i>
                                </blockquote>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                                <div class="blog-share-tags">
                                    <div class="blog-share">
                                        <div class="blog-btn">
                                            <a href="#"><i class="fa fa-share-alt"></i></a>
                                        </div>
                                        <div class="blog-social">
                                            <ul>
                                                <li>
                                                    <a class="whatsapp" href="whatsapp://send?text={{route('history')}}">
                                                        <i class="fa fa-whatsapp"></i>
                                                    </a>
                                                </li>
                                                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                                <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a>
                                                </li>
                                                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                                <li><a class="google" href="#"><i class="fa fa-google-plus"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="blog-tag">
                                        <ul>
                                            <li><a href="#">Sejarah</a></li>
                                            <li><a href="#">Darul Hikmah</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="blog-author mt-80">
                                <div class="author-img">
                                    <img src="{{asset('assets/images/article/author.jpg')}}" alt="">
                                </div>
                                <div class="author-content">
                                    <div class="author-content-top">
                                        <div class="blog-designation">
                                            <h5>Administrator</h5>
                                            <span>Penulis</span>
                                        </div>
                                        <div class="author-social">
                                            <ul>
                                                <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                                                <li><a class="instagram" href="#"><i class="fa fa-instagram"></i></a></li>
                                                <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, conse ctetur adipi sicing elit, sed do eiusm od tempor incidi dunt ut labore et dolore magna aliqua. Ut enim fugiat nulla pariaatat non proident, sunt in culpa qui officia deserunt m ut perspiciatis und.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @include('layout.sidebar')
            </div>
        </div>
    </div>
    <div class="brand-logo-area pb-130">
        <x-brand />
    </div>
@endsection
