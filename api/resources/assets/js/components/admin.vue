<template>
    <div>
        <user-login v-if="!currentUser" :user="currentUser" @login-click="loginUser"></user-login>
        <users-estatisticas v-if="currentUser" :user="currentUser" ></users-estatisticas>
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
        loginUser: function(token){
            this.showSuccess = true;
            this.successMessage = 'Utilizador Logado';
            if(token!=null)
                this.getUserLigado(token);
        },
        getUserLigado: function(token){
            const AuthStr = 'Bearer '.concat(token);
            console.log(AuthStr);
            axios.get('api/user', { headers: { Authorization: AuthStr } })
                .then(
                    response=>{
                        this.currentUser=response.data;

                            console.log(this.currentUser.name);
                        this.successMessage = 'Bem vindo '+this.currentUser.name;
                    }

                );

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