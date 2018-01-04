<template>
    <div>
        <div class="alert alert-success" v-if="showSuccess">

            <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
            <strong>{{ successMessage }}</strong>
        </div>

        <user-login :user="currentUser" @block-click="loginUser"></user-login>
        <users-password :user="currentUser" @block-click="passwordUser"></users-password>
        <user-create :user="currentUser" @block-click="createUser"></user-create>
        <users-estatisticas :user="currentUser" ></users-estatisticas>


    </div>
</template>

<script type="text/javascript">
    import UserLogin from './userLogin.vue';
    import UserCreate from './createUser.vue';
    import Estatitiscas from './estatisticas.vue';
    import ForgetPassword from './forgetPassword.vue';

    export default {
        data: function(){
            return {
                showSuccess: false,
                successMessage: '',
                currentUser: null,
                users: [],
            }
        },
        methods: {
            childMessage: function(message){
                this.showSuccess = true;
                this.successMessage = message;
                window.scrollTo(0, 0);
            },
            loginUser: function(){
                this.currentUser = null;
                this.showSuccess = true;
                this.successMessage = 'Utilizador Logado';
            },
            createUser: function(user){
                this.currentUser=user;
                this.showSuccess = true;
                this.successMessage = 'Utilizador Criado';
            },
            passwordUser: function(user){
                this.currentUser=user;
                this.showSuccess = true;
                this.successMessage = 'Utilizador Criado';
            }
        },
        components: {
            'user-create': UserCreate,
            'user-login': UserLogin,
            'users-estatisticas': Estatitiscas,
            'users-password': ForgetPassword,

        },
        mounted() {
            this.user();
            console.log("ola");
        }

    }
</script>