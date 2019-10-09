import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

let apiUrl = process.env.VUE_APP_API_URL,
    apiKey = '?api_key=' + process.env.VUE_APP_API_KEY

export default new Vuex.Store({
    state: {
        movies: [],
        movie: null,
        movieVideos: [],
        genres: [],
        currentGenre: null,
    },
    actions: {
        getMovies: (context, page) => {
            let url = `${apiUrl}discover/movie${apiKey}&page=${page}`
            if (context.state.currentGenre !== null) {
                url += `&with_genres=${context.state.currentGenre}`
            }
            axios({
                method: 'get',
                url: url,
            })
                .then(function (response) {
                    context.commit('setMovies', response.data);
                });
        },
        getMovie: async (context, id) => {
            axios({
                method: 'get',
                url: `${apiUrl}movie/${id}${apiKey}`,
            })
                .then((response) => {
                    context.commit('setMovie', response.data);
                });
        },
        getMovieVideos: (context, id) => {
            axios({
                method: 'get',
                url: `${apiUrl}movie/${id}/videos${apiKey}`,
            })
                .then((response) => {
                    context.commit('setMovieVideos', response.data.results);
                });
        },
        getGenres: (context) => {
            axios({
                method: 'get',
                url: `${apiUrl}genre/movie/list${apiKey}`
            })
                .then(function (response) {
                    context.commit('setGenres', response.data.genres);
                });
        }
    },
    mutations: {
        setMovies: (state, movies) => {
            state.movies = movies
        },
        setMovie: (state, movie) => {
            state.movie = movie
        },
        setMovieVideos: (state, videos) => {
            state.movieVideos = videos
        },
        setGenres: (state, genres) => {
            state.genres = genres
        },
        setCurrentGenre: (state, genre) => {
            state.currentGenre = genre
        }
    },

    getters: {
        movies: state => {
            return state.movies
        },
        movie: state => {
            return state.movie
        },
        movieVideos: state => {
            return state.movieVideos
        },
        genres: state => {
            return state.genres
        }
    }
});