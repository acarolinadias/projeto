<template>
<div>
<div class="jumbotron">
    <h1>{{ title }}</h1>
</div>
    <div class="alert alert-success" v-if="showSuccess">

        <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
        <strong>{{ successMessage }}</strong>
    </div>
    <user-list :users="users" @block-click="blockUser" @unblock-click="unblockUser" @get-users="getUsers" ref="usersListRef"></user-list>
    <user-block :user="currentUser" @block-success="blockSuccess" v-if="currentUser"></user-block>
    <user-create :user="currentUser" @block-click="createUser" v-if="currentUser"></user-create>

</div>

</template>




    <script type="text/javascript">
import UserList from './userList.vue';
import UserBlock from './userBlock.vue';
import UserCreate from './createUser.vue';

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
        blockUser: function(user){
            this.currentUser=user;
            console.log("Abrindo block reason" +user);

        },
        unblockUser: function(user){
            this.currentUser=user;
            console.log("Abrindo block reason" +user);

        },

        getUsers: function(){
            axios.get('api/users')
                .then(response=>{this.users = response.data.data; });
        },

        blockSuccess: function(user){
            this.currentUser=null;
            this.childMessage(user.name+" alterado com sucesso");
        },
        childMessage: function(message){
            this.showSuccess = true;
            this.successMessage = message;
            window.scrollTo(0, 0);
        },

        createUser: function(){
            this.currentUser = null;
            this.showSuccess = true;
            this.successMessage = 'Utilizador Guardado';
        },
    },
    components: {
        'user-list': UserList,
        'user-block': UserBlock,
        'user-create': UserCreate
    },
    mounted() {
        this.getUsers();
        console.log("ola");
    }
}
</script>
