<template>
    <div class="container">
        <div class="card card-register mx-auto mt-5">
            <div class="card-header">RECUPERAR PASSWORD</div>
            <div class="card-body">
                <form>
                    <label for="exampleInputEmail1">Inserir o Email</label>
                    <input class="form-control" id="exampleInputEmail1" type="email" aria-describedby="emailHelp" placeholder="Inserir o Email">
                    <a class="btn btn-primary btn-block" v-on:click.prevent="forgetPassword()">Recuperar</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    module.exports={
        props: ['user'],
        methods: {
            forgetPassword: function(){
                axios.put('api/users/'+this.user, this.user)
                    .then(response=>{
                        // Copy object properties from response.data.data to this.user
                        // without creating a new reference
                        Object.assign(this.user, response.data.data);
                        this.$emit('user-saved', this.user);
                    });
            },
        }
    }
</script>