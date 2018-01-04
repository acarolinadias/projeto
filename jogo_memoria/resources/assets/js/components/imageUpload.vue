<template>
    <div id="uploudzone">

        <div class="jumbotron">




        </div>

    </div>
</template>

<script type="text/javascript">

module.exports={

    data: function(){
        return {
            img: null,
        }
    },
    methods: {
        uploadImg:function (img) {
            this.img=img;
            console.log("upload"+img);
        }

    },

}
</script>