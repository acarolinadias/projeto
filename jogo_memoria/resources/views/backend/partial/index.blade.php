@extends('backend.master')
@section("title", "Inicio")
@section("content")
        <div id="app">
            <router-view></router-view>
        </div>
@endsection

@section('pagescript')
    <script src="js/app.js"></script>
@stop
