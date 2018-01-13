<template>
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
                            <a class="btn btn-success btn-block" v-on:click.prevent="changePassword()">ALTERAR</a>
                            <a class="btn btn-default btn-block" v-on:click.prevent="cancelUser()">CANCELAR</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    module.exports={
        props: ['user'],
        methods: {
            changePassword: function(){
                axios.put('api/users/'+this.user, this.user)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-saved', this.user);
                    });
            },
            cancelUser: function(){
                axios.put('api/users/'+this.user, this.user)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-saved', this.user);
                    });
            },
        }
    }
</script>