<template>
  <div class="movie-wrap">
    <div v-for="movie in movieData[0]" :key="movie.id">
      <movieBox :movieInfo="movie" @view-movie="viewMovie" />
    </div>
    <popUp
      class="pop-up"
      :class="{ active: popShow }"
      :movieDetails="movieDetails"
      @close-btn="closeBtn"
    />
    <div class="overlay" @click="closeBtn" :class="{ active: popShow }"></div>
  </div>
</template>

<script>
import movieBox from "@/components/movieBox";
import popUp from "@/components/popUp";
import { ref } from "vue";
export default {
  name: "SuggestedMovie",
  components: { movieBox, popUp },
  setup() {
    const movieData = ref([]);
    let popShow = ref(false);
    let movieDetails = ref({});

    // for displaying 20 movies
    fetch(`https://yts.mx/api/v2/list_movies.json?limit=50`)
      .then((res) => res.json())
      .then((data) => {
        movieData.value.push(data.data.movies);
      });

    function viewMovie(id) {
      popShow.value = true;
      movieDetails.value.background_image = id.background_image;
      movieDetails.value.title = id.title;
      movieDetails.value.year = id.year;
      movieDetails.value.rating = id.rating;
      movieDetails.value.genres = id.genres;
      movieDetails.value.torrents = id.torrents;
      movieDetails.value.url = id.url;
      console.log(movieDetails.value);
    }

    function closeBtn() {
      popShow.value = false;
    }

    return {
      movieData,
      viewMovie,
      popShow,
      movieDetails,
      closeBtn,
    };
  },
};
</script>
