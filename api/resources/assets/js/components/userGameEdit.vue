<template>
    <div class="container">
        <div class="card card-register mx-auto mt-5">
            <div class="card-header">Alterar Informações</div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <div class="form-row">
                            <label for="exampleInputName">Nome Completo</label>
                            <input class="form-control" id="exampleInputName" type="text" aria-describedby="nameHelp" placeholder="Nome Completo">
                        </div>
                        <div class="form-row">
                            <label for="exampleInputLastName">Nickname</label>
                            <input class="form-control" id="exampleInputLastName" type="text" aria-describedby="nameHelp" placeholder="Nickname">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <div class="form-row">
                            <div class="col-md-6">
                                <label for="exampleInputPassword1">Senha</label>
                                <input class="form-control" id="exampleInputPassword1" type="password" placeholder="Password">
                            </div>
                            <div class="col-md-6">
                                <label for="exampleConfirmPassword">Confirmar Senha</label>
                                <input class="form-control" id="exampleConfirmPassword" type="password" placeholder="Confirm password">
                            </div>
                        </div>
                    </div>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="saveUser()">Alterar</a>
                    <a class="btn btn-danger btn-block" v-on:click.prevent="deleteUser()">Apagar</a>
                    <a class="btn btn-warning btn-block" v-on:click.prevent="anulaUser()">Anular</a>
                </form>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    module.exports={
        props: ['user'],
        methods: {
            saveUser: function(){
                axios.put('api/users/'+this.user.id, this.user)
                    .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    Object.assign(this.user, response.data.data);
                this.$emit('user-saved', this.user);
            });
            },
            cancelEdit: function(){
                axios.get('api/users/'+this.user.id)
                    .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    Object.assign(this.user, response.data.data);
                this.$emit('user-canceled', this.user);
            });
            },
            anulaUser: function(){
                axios.get('api/users/'+this.user.id)
                    .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    Object.assign(this.user, response.data.data);
                this.$emit('user-canceled', this.user);
            });
            }
        }
    }
</script>