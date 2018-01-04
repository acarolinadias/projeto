<template>
    <div class="container">
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">Login</div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Senha</label>
                        <input class="form-control" id="exampleInputPassword1" type="password" placeholder="Senha">
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox"> Lembrar Senha</label>
                        </div>
                    </div>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="loginUser()">LOGIN</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="recuperarSenha()">Recuperar Senha</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="saveUser()">CRIAR UTILIZADOR</a>
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
                axios.put('api/users/'+this.user, this.user)
                    .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    Object.assign(this.user, response.data.data);
                this.$emit('user-saved', this.user);
            });
            },
            recuperarSenha: function(){
                /*axios.put('api/users/'+this.user.id, this.user)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-saved', this.user);
                    });*/
            },
            loginUser: function(){
                axios.post('api/login')
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-login', this.user);
                    });
            }
        }
    }
</script>