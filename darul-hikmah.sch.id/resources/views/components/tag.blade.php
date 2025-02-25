<div class="sidebar-tag">
    <ul>
        @foreach($tags as $tag)
            <li><a href="{{route('article', ['tag' => $tag->id])}}">{{$tag->name}}</a></li>
        @endforeach
    </ul>
</div>
