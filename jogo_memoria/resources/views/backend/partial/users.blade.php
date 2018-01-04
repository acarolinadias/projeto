@extends('backend.master')
@section("title", "Inicio")
@section("content")

<ol class="breadcrumb">
    <li class="breadcrumb-item">
        <a href="#">Inicio</a>
    </li>
    <li class="breadcrumb-item active">Utilizadores</li>
</ol>
<div class="row" id="app">
<div class="card mb-3">
    <div class="card-header" >
        <i class="fa fa-user-o"></i> Tabela de Utilizadores</div>


    <router-view></router-view>
        </div>
    </div>
</div>



    @endsection

@section('pagescript')
    <script src="js/app.js"></script>

    <!-- <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/vueapp.js"></script>
     -->
@stop
