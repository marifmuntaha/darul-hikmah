<div class="category-list">
    <ul>
        @foreach($categories as $category)
            <li>
                <a href="{{route('article', ['category' => $category->id])}}">
                    {{$category->name}} <span>{{$category->article()->get()->count()}}</span>
                </a>
            </li>
        @endforeach
    </ul>
</div>
