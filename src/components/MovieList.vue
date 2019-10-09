<template>
    <div>
        <div class="row">
            {{ currentGenre }}
            <div class="col-md-3" v-for="movie in movies.results" v-bind:key="movie.id">
                <div class="movie-item">
                    <div class="image-holder">
                        <router-link :to="`/movie/${movie.id}`">
                            <img class="img-fluid" :src="`${apiImagePath}${movie.poster_path}`">
                        </router-link>
                    </div>
                    <div class="movie-content">
                        <div class="">
                            {{ movie.title }}
                        </div>
                        <div class="">
                            {{ movie.release_date}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled' : page === 1}">
                    <a class="page-link" href="#" @click="prevNextPage(page - 1)">Previous</a>
                </li>
                <li class="page-item" :class="{'disabled' : page === movies.total_pages}">
                    <a class="page-link" href="#" @click="prevNextPage(page + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "MovieList",
        props: ['currentGenre'],
        data() {
            return {
                page: 1,
                apiImagePath: process.env.VUE_APP_API_IMAGE_PATH,
            };
        },
        computed : {
            ...mapGetters(['movies']),
        },
        methods: {
            ...mapActions(['getMovies']),
            prevNextPage(page) {
                if(page >= 1 && page <= this.movies.total_pages) {
                    this.page = page
                    this.getMovies(this.page)
                }
            }
        },
        mounted() {
            this.getMovies(this.page)
        }
    }
</script>

<style scoped>
    .movie-item {
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.5) ;
        margin-bottom: 30px;
        overflow: hidden;
    }
    .movie-content {
        padding: 10px 15px;
    }
</style>