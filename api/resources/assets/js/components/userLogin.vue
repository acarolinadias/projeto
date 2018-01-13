<template>
    <div class="container">
        <div class="card card-login mx-auto mt-5">
            <div class="card-header">Login</div>
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input v-model="email" class="form-control" id="exampleInputEmail1" type="email"
                               aria-describedby="emailHelp" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Senha</label>
                        <input v-model="password" class="form-control" id="exampleInputPassword1" type="password"
                               placeholder="Senha">
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox"> Lembrar Senha</label>
                        </div>
                    </div>
                    <a href="/redirect" class="btn btn-primary">Login with Facebook</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="loginUser()">Login</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="recuperarSenha()">Recuperar Senha</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="createUser()">Criar Utilizador</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    module.exports = {
        props: ['user'],
        data: {
            email: '',
            password: '',
            token:''
        },
        methods: {
            loginUser: function () {

                axios.post('/api/login', {
                    email: this.email,
                    password: this.password
                }, {
                    headers: {
                        'Accept': 'application/json',
                    }
                }).then(response => {
                        this.token=response.data.access_token;
                        this.$emit('login-click', this.token);

                    }).catch(error => {
                    console.log(error);
                });

                this.$emit('login-click', this.token);
            },
            loginFace:function(){

            },
            logoutUser: function () {
                axios.post('api/test', {
                    access_token: this.access_token,
                    //refresh_token: this.refresh_token
                }, {
                    headers: {
                        'Authorization': 'Bearer Token',
                    }
                })
                    .then(response => {
                        console.log(response.data);

                    });



            },
            recuperarSenha: function () {
                /*axios.put('api/users/'+this.user.id, this.user)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-saved', this.user);
                    });*/
            },
            createUser: function () {

    this.$parent.createUser = true;
    this.$parent.logged= true;
            }
        }
    }
</script>