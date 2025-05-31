<div class="container">
    <div class="brand-logo-active owl-carousel">
        @foreach($brands as $brand)
            <div class="single-brand-logo">
                <a href="#">
                    <img src="{{asset($brand->image)}}" alt="{{$brand->name}}">
                </a>
            </div>
        @endforeach
    </div>
</div>
