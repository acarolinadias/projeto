<template>
    <div id="blockzone">
    <div class="jumbotron">
        <h2 v-if="user.blocked==1">Desbloquear Utilizado</h2>
        <h2 v-else>Bloquear Utilizado {{user.name}}</h2>
        <div class="form-group">
            <label  v-if="user.blocked==1" for="reason">Razão de desbloqueio</label>
            <label v-else for="reason">Razão de bloqueio</label>
            <input
                type="text" class="form-control"
                name="name" id="inputName"
                placeholder="Razão..."
                v-model="user.reason_blocked"
                v-if="user.blocked==0"
            />
            <input
                type="text" class="form-control"
                name="name" id="inputName"
                placeholder="Razão..."
                v-model="user.reason_reactivated"
                v-else
            />
        </div>


        <div class="form-group">
            <a v-if="user.blocked==1" class="btn btn-success" v-on:click.prevent="unblockUser()">Desbloquear</a>
            <a v-else class="btn btn-success" v-on:click.prevent="blockUser()">Bloquear</a>

        </div>
    </div>
    </div>
</template>

<script type="text/javascript">
module.exports={
    props: ['user', 'departments'],
    methods: {
        blockUser: function(){
            //this.editingUser = null;
            //this.$emit('block-click', user);
            this.user.blocked=1;
            axios.put('api/users/'+this.user.id+'/block', this.user)
                .then(response=>{
                    //Object.assign(this.user, response.data.data);
                });
            this.$emit('block-success', this.user);
            console.log("Bloqueando utilizador"+ this.user.id + ' AXIOS '+this.user.blocked);
        },
        unblockUser: function(){
            //this.editingUser = null;
            //this.$emit('block-click', user);
            this.user.blocked=0;
            axios.put('api/users/'+this.user.id+'/unblock', this.user)
                .then(response=>{
                    Object.assign(this.user, response.data.data);
                });
            this.$emit('block-success', this.user);
            console.log("Bloqueando utilizador"+ this.user.id + ' AXIOS '+ this.user.blocked);
        },
    }
}
</script>

<style scoped>

</style>