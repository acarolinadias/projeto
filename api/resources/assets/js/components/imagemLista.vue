<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Activo</th>
            <th>Caminho</th>
            <th>Criado</th>
            <th>Atualizado</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="img in imgs"  :key="img.id" >
            <td>{{ img.id }}</td>
            <td><img v-bind:src="imgsrc(img.path)"/></td>
            <td>{{ img.active }}</td>
            <td>{{ img.path }}</td>
            <td>{{ img.created_at }}</td>
            <td>{{ img.updated_at }}</td>
            <td>

                <a class="btn btn-xs btn-primary" v-on:click.prevent="deleteImg(img)">Apagar</a>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/javascript">

    module.exports={
        props: ['imgs'],
        data: function(){
            return {
                editingImage: null
            }
        },
        methods: {
            imgsrc(src){
                var imgSrc = String(src);
                return 'img/' + imgSrc;
            },
            deleteImg(img){
                console.log("apando a img");
                this.$emit('delete-click', img);
            },

        },

    }
</script>