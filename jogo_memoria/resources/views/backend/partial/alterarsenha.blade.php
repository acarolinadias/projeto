@extends('backend.master')
@section("title", "Inicio")
@section("content")

    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="#">Inicio</a>
        </li>
        <li class="breadcrumb-item active">Alterar Senha</li>
    </ol>

    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <div class="card-header">
                        <i class="fa fa-cog"></i> Alterar Senha
                    </div>
                    <div class="card-body">
                        <form role="form">
                            <div class="form-group has-success">
                                <label class="form-control-label" for="inputSuccess">Senha Antiga</label>
                                    <input type="text" class="form-control form-control-success" id="inputSuccess">
                            </div>
                            <div class="form-group has-warning">
                                <label class="form-control-label" for="inputWarning">Nova Senha</label>
                                <input type="text" class="form-control form-control-warning" id="inputWarning">
                            </div>
                            <div class="form-group has-danger">
                                <label class="form-control-label" for="inputError">Confirmar a Nova Senha</label>
                                <input type="text" class="form-control form-control-danger" id="inputError">
                            </div>
                            <button type="submit" class="btn btn-success">Alterar</button>
                            <button type="reset" class="btn btn-default">Cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('pagescript')
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src=""></script>

@endsection
