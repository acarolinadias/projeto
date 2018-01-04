@extends('frontend.masterfrontend')
@section("title", "Inicio")
@section("content")

    <div id="app">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/#">INICIO</router-link>
            </li>
            <li class="breadcrumb-item active">"NOME UTILIZADOR LOGADO"</li>
        </ol>
    </div>

    <router-view> </router-view>


@endsection

@section('pagescript')
    <script src="js/app.js"></script>

    <!-- <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/vueapp.js"></script>
     -->
@stop