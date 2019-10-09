<template>
    <div class="container-fluid">
        <div class="row">
            <template v-if="!movie">
                Please wait loading...
            </template>
            <template v-else>
                <div class="col-md-12">
                    <div class="">
                        <h1>{{ movie.title }}</h1>
                    </div>
                    <div class=""></div>
                </div>
                <div class="col-md-4">
                    <img class="img-fluid" :src="`${apiImagePath}${movie.poster_path}`">
                </div>
                <div class="col-md-8">
                    <div class="">Ratings</div>
                    <div class="">{{ movie.vote_average }} ({{ movie.vote_count }})</div>
                    <div class="">Homepage</div>
                    <div class=""><a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></div>
                    <div class="">Release Date</div>
                    <div class="">{{ movie.release_date }}</div>
                    <div class="">Genres</div>
                    <div class="">
                    <span v-for="genre in movie.genres" v-bind:key="genre.id">
                        {{ genre.name }},
                    </span>
                    </div>
                    <h2>{{ movie.title }} - Overview</h2>
                    <div class="">
                        {{ movie.overview }}
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="">
                        <h3>Videos:</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-4" v-for="video in movieVideos" v-bind:key="video.id">
                            <div class="video-holder">
                                <iframe width="100%" height="100%" :src="`https://www.youtube.com/embed/${video.key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                {{ video.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "MovieDetails",
        data() {
            return {
                apiImagePath: process.env.VUE_APP_API_IMAGE_PATH,
            };
        },
        computed: {
            ...mapGetters(['movie', 'movieVideos']),
        },
        methods: {
            ...mapActions(['getMovie', 'getMovieVideos']),
        },
        mounted() {
            this.getMovie(this.$route.params.id)
            this.getMovieVideos(this.$route.params.id)
        }
    }
</script>

<style scoped>
    .video-holder {
        margin-bottom: 30px;
    }
</style>