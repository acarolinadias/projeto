<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Jogadores conectados</th>
            <th>Nome da sala</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in games"  :key="game.gameID">
        <td>{{ game.gameID }}</td>
        <td>{{ game.players }}</td>
        <td>{{ game.name }}</td>
        <td>
            <a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Juntar</a>
            <a class="btn btn-xs btn-primary" v-on:click.prevent="remove(game)">Remover</a>
        </td>
        </tr>
    </tbody>
</table>
</template>

<script type="text/javascript">
// Component code (not registered)
module.exports={
    props: ['games'],
    methods: {
        join(game) {
            this.$emit('join-click', game);
        },
        remove(game){
            this.$emit('remove-click', game);
        },
    },
}
</script>

<style scoped>

</style>