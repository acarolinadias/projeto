<template>
    <div id="uploudzone">

        <div class="jumbotron">
            <div class="col-md-2">
                <img :src="image" class="img-responsive">
            </div>
            <div>
                <h2>Selecionar Imagem</h2>
                <input type="file" @change="onFileChange" name="path">
            </div>
            <a class="btn btn-success" v-on:click.prevent="uploadImg()">Carregar</a>
            <a class="btn btn-warning" v-on:click.prevent="cancelImg()">Cancelar</a>
        </div>

    </div>
</template>

<script type="text/javascript">

module.exports={
    data: function(){
        return {
            face: "",
            active: "",
            path :""  ,
            image: ""
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            //console.log(files);
            this.path = files[0].name;

            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = e => {
                vm.image = e.target.result

            };
            reader.readAsDataURL(file);
        },

        uploadImg() {
            axios.post('api/images/store', {
                face: this.face,
                active: this.active,
                path: this.path,
                image: this.image
            }
                )
                .then(response=>{
                    // Copy object properties from response.data.data to this.user
                    // without creating a new reference
                    console.log(response);
                    //console.log(response);
                    Object.assign(response.data);
                    this.$emit('img-upload', this.data)
                });
            this.$router.push("/images");
        },
        cancelImg(){
            this.$router.push("/images");
        }
    }
}
</script>