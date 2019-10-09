<template>
    <div class="container-fluid">
        <h1>Online Cinema</h1>
        <div class="row">
            <div class="col-md-3">
                <Genres></Genres>
            </div>
            <div class="col-md-9">
                <MovieList></MovieList>
            </div>
        </div>
    </div>
</template>

<script>
    import Genres from "../components/Genres";
    import MovieList from "../components/MovieList";

    export default {
        name: 'home',
        components: {MovieList, Genres},
    }
</script>
