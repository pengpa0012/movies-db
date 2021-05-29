<template>
  <div>
    <!-- 
    <div class="filter" v-if="!showLoader">
      <span>Sort By</span>
      <div class="radio">
        <span>Score</span>
        <input type="checkbox" v-model="checkScore" @click="sortByScore" />
      </div>
    </div> -->
    <div class="movie-wrap">
      <loader v-if="showLoader" class="loader" />
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
  </div>
</template>

<script>
import movieBox from "@/components/movieBox";
import popUp from "@/components/popUp";
import loader from "@/components/loader";
import { ref } from "vue";
export default {
  name: "SuggestedMovie",
  components: { movieBox, popUp, loader },
  setup() {
    const movieData = ref([]);
    let popShow = ref(false);
    let movieDetails = ref({});
    let showLoader = ref(true);
    /* let checkScore = ref(false); */

    // for displaying 20 movies
    fetch(`https://yts.mx/api/v2/list_movies.json?limit=50`)
      .then((res) => res.json())
      .then((data) => {
        showLoader.value = false;
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

    /* function sortByScore() {
      checkScore.value = !checkScore.value;
      if (checkScore.value == false) {
        let sortedMoviesByScore = movieData.value[0].sort((a, b) => {
          return parseInt(a.rating) - parseInt(b.rating);
        });
        movieData.value = [];
        movieData.value.push(sortedMoviesByScore);
        return;
      }
      let sortedMoviesByScore = movieData.value[0].sort((a, b) => {
        return parseInt(b.rating) - parseInt(a.rating);
      });
      movieData.value = [];
      movieData.value.push(sortedMoviesByScore);
      console.log(movieData.value);
    } */

    function closeBtn() {
      popShow.value = false;
    }

    return {
      movieData,
      viewMovie,
      popShow,
      movieDetails,
      closeBtn,
      showLoader,
      /*  sortByScore, */
    };
  },
};
</script>

<style scoped>
/* 
.filter,
.filter .radio {
  display: flex;
} */
</style>
