<template>
  <div>
    <sort v-if="showSort" v-model="checkScore" @check-score="sortByScore" />
    <div class="movie-wrap">
      <loader v-if="showLoader" class="loader" />
      <errorMsg v-if="showError" />
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
import sort from "@/components/sort";
import errorMsg from "@/components/errorMsg";

import { ref } from "vue";
export default {
  name: "SuggestedMovie",
  components: { movieBox, popUp, loader, sort, errorMsg },
  setup() {
    const movieData = ref([]);
    let popShow = ref(false);
    let movieDetails = ref({});
    let showLoader = ref(true);
    let showError = ref(false);
    let showSort = ref(false);
    let checkScore = ref(false);

    // for displaying 50 movies
    fetch(`https://yts.mx/api/v2/list_movies.json?limit=50`)
      .then((res) => res.json())
      .then((data) => {
        showLoader.value = false;
        showSort.value = true;
        movieData.value.push(data.data.movies);
      })
      .catch(
        setTimeout(() => {
          showLoader.value = false;
          showError.value = true;
        }, 8000)
      );

    function viewMovie(id) {
      popShow.value = true;
      movieDetails.value.background_image = id.background_image;
      movieDetails.value.title = id.title;
      movieDetails.value.year = id.year;
      movieDetails.value.rating = id.rating;
      movieDetails.value.genres = id.genres;
      movieDetails.value.torrents = id.torrents;
      movieDetails.value.url = id.url;
    }

    function sortByScore() {
      checkScore.value = !checkScore.value;
      if (checkScore.value == false) {
        let sortedDescend = movieData.value[0].sort((a, b) => {
          return parseFloat(a.rating) - parseFloat(b.rating);
        });
        movieData.value = [];
        movieData.value.push(sortedDescend);
        return;
      }
      let sortedAscend = movieData.value[0].sort((a, b) => {
        return parseFloat(b.rating) - parseFloat(a.rating);
      });
      movieData.value = [];
      movieData.value.push(sortedAscend);
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
      showLoader,
      showError,
      sortByScore,
      checkScore,
      showSort,
      errorMsg,
    };
  },
};
</script>
