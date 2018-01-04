@extends('backend.master')
@section("title", "Inicio")
@section("content")

<ol class="breadcrumb">
    <li class="breadcrumb-item">
        <a href="#">Inicio</a>
    </li>
    <li class="breadcrumb-item active">Utilizadores</li>
</ol>
 <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
     <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">{{$user->name}}</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                  <div class=" col-md-9 col-lg-9 ">
                      @if (count($users))
                        <table class="table table-user-information" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Nickname</th>
                                <th>Bloqueado</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                      @else
                          <h2>Este utilizadores não tem dados!</h2>
                      @endif
                        <a href="#" class="btn btn-success">REATIVAR</a>
                        <a href="#" class="btn btn-warning">BLOQUEAR</a>
                        <a href="#" class="btn btn-danger">REMOVER</a>
                    </div>
                </div>
            </div>
        </div></div>
    @endsection
@section('pagescript')
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="js/usersinfo.js"></script>
@endsection