<template>
    <div>
        <div class="jumbotron">
            <h1>{{ title }}</h1>
        </div>
        <div class="alert alert-success" v-if="showSuccess">

            <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
            <strong>{{ successMessage }}</strong>
        </div>

        <user-email :user="currentUser" @block-click="changeEmail()" v-if="currentUser"></user-email>
        <user-password :user="currentUser" @block-click="changePassword()" v-if="currentUser"></user-password>

    </div>

</template>

<script type="text/javascript">
    import ChangeEmail from './changeEmail.vue';
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
            changeEmail: function(message){

            },

            childMessage: function(message){
                this.showSuccess = true;
                this.successMessage = message;
                window.scrollTo(0, 0);
            },
        },
        components: {
            'user-email': ChangeEmail,
        },
        mounted() {
            this.getUsers();
            console.log("ola");
        }

    }
</script>