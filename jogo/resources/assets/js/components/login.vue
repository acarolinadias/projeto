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
                    <a class="btn btn-primary btn-block" v-on:click.prevent="loginUser()">LOGIN</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="recuperarSenha()">Recuperar Senha</a>
                    <a class="btn btn-primary btn-block" v-on:click.prevent="createUser()">CRIAR UTILIZADOR</a>
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
            token: ''
        },
        methods: {
            loginUser: function () {

                axios.post('http://dad.api/api/login', {
                    email: this.email,
                    password: this.password
                }, {
                    headers: {
                        'Accept': 'application/json',
                    }
                }).then(response => {
                    this.token = response.data.access_token;
                    this.$emit('login-click', this.token);

                }).catch(error => {
                    console.log(error);
                });

                this.$emit('login', this.token);
            },
            logoutUser: function () {
                axios.post('http://dad.api/api/test', {
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

            },
            createUser: function () {

            }
        }
    }
</script>