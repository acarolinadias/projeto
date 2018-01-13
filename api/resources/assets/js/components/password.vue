<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>
        <div class="alert alert-success" v-if="showSuccess">

            <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
            <strong>{{ successMessage }}</strong>
        </div>

        <user-password :user="currentUser" @block-click="changePassword()" v-if="currentUser"></user-password>

    </div>

</template>




<script type="text/javascript">
    import ChangePassword from './changePassword.vue';


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

            changePassword: function(message){

            },
        },
        components: {
            'user-password': ChangePassword,
        },
        mounted() {
            this.getUsers();
            console.log("ola");
        }

    }
</script>
