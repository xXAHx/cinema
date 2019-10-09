<template>
    <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action" :class="{'active': currentGenre === null}" @click="changeGenre(null)">
            All
        </a>
        <a href="#"  v-for="genre in genres" v-bind:key="genre.id" class="list-group-item list-group-item-action" :class="{'active': genre.id === currentGenre}" @click="changeGenre(genre.id)">
            {{ genre.name }}
        </a>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';

    export default {
        name: "Genres",
        computed : {
            ...mapGetters(['genres']),
            ...mapState(['currentGenre'])
        },
        methods: {
            ...mapActions(['getGenres', 'getMovies']),
            changeGenre(genre){
                this.$store.commit('setCurrentGenre', genre);
                this.getMovies(1)
            }
        },
        mounted() {
            this.getGenres()
        }
    }
</script>

<style scoped>

</style>