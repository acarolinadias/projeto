<template>
    <div>
        <img-list :imgs="imgs" @delete-click='deleteImg'>
        </img-list>
        <a class="btn btn-success" v-on:click.prevent="uploading()">Carregar imagem</a>
        <img-upload  v-if="carregarImagem"></img-upload>
    </div>

</template>

<script type="text/javascript">

import ImgList from './imagemLista.vue';
import ImgUpload from './imageUpload.vue';


    export default {
        data: function(){
            return {
                title: 'Lista de Imagens',
                showSuccess: false,
                successMessage: '',
                currentImage: null,
                carregarImagem: false,
                imgs: null
            }
        },
        methods: {
            getImages: function(){
                console.log("Getting images");
                axios.get('api/images')
                    .then(response=>{this.imgs = response.data; });

            },
            childMessage: function(message){
                this.showSuccess = true;
                this.successMessage = message;
            },
            deleteImg:function (img) {
                console.log("apando a img");
                axios.delete('api/images/'+img.id)
                    .then(response => {
                        this.getImages();
                    });

            },
            uploading:function () {
                console.log("carregar imagem");
                this.carregarImagem=true;

            }
        },
        components: {
            'img-list': ImgList,
            'img-upload':ImgUpload
        },
        mounted() {
            this.getImages();
            console.log("ola");
        }

    }
</script>