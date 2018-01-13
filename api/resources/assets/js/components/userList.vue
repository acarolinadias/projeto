<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
        <div class="panel panel-info">

            <div class="panel-body">
                <div class="row">
                    <div class=" col-md-9 col-lg-9 ">

    <table class="table table-striped">
        <thead>
        <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Nickname</th>
            <th>Admin</th>
            <th>Bloqueado</th>
            <th>Razão pelo bloqueio</th>
            <th>Razão pelo desbloqueio</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users"  :key="user.id" >
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.nickname }}</td>
        <td>{{ user.admin }}</td>
        <td>{{ user.blocked }}</td>
        <td>{{ user.reason_blocked }}</td>
        <td>{{ user.reason_reactivated }}</td>
        <td>

            <div v-if="user.admin==0">
                <a v-if="user.blocked==0 " class="btn btn-xs btn-danger" v-on:click.prevent="blockUser(user)">Bloquear</a>
                <a v-else class="btn btn-xs btn-success" v-on:click.prevent="unblockUser(user)">Desbloquear</a>
                <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Eliminar</a>
            </div>
        </td>


        </tr>
    </tbody>
</table>
<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
</nav>
                </div></div>
        </div>
    </div>
</div>

</template>

<script type="text/javascript">

module.exports={
    props: ['users'],
    data: function(){
        return {
            editingUser: null
        }
    },
    methods: {
        blockUser: function(user){
            this.$emit('block-click', user);
            var objDiv = document.getElementById("blockzone");
            objDiv.scrollTop = objDiv.scrollHeight;
            console.log("Bloqueando utilizador"+ user.id + user.blocked);
        },
        deleteUser: function (user) {
            console.log("Apagando utilizador"+ user.id);
            axios.delete('api/users/'+user.id)
                .then(response => {
                this.$emit('get-users');
            });
        },
        unblockUser: function(user){
            this.$emit('unblock-click', user);
            console.log("Bloqueando utilizador"+ user.id + user.blocked);
        },

    },
}
</script>

