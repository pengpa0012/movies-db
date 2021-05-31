<template>
  <div class="search-movie">
    <div class="flex-input">
      <input v-model="movieSearch" placeholder="Search a movie..." />
      <button @click="searchMovie">Search</button>
    </div>
    <sort v-if="showSort" v-model="checkScore" @check-score="sortByScore" />
    <div class="movie-wrap">
      <loader v-if="showLoader" class="loader" />
      <div v-if="err" class="error-message">
        {{ "Error, try different keywords" }}
      </div>
      <div v-for="movie in movieData[0]" :key="movie.id">
        <movieBox :movieInfo="movie" @view-movie="viewMovie" />
      </div>
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
import loader from "@/components/loader";
import sort from "@/components/sort";
import { onMounted, ref } from "vue";
export default {
  name: "SearchMovie",
  components: { movieBox, popUp, loader, sort },
  setup() {
    let movieData = ref([]);
    const movieSearch = ref("");
    let movieDetails = ref({});
    let popShow = ref(false);
    let showLoader = ref(true);
    let showSort = ref(false);
    let checkScore = ref(false);
    let err = ref(false);

    onMounted(() => {
      fetch(`https://yts.mx/api/v2/list_movies.json?query_term=batman`)
        .then((res) => res.json())
        .then((data) => {
          showLoader.value = false;
          showSort.value = true;
          movieData.value.push(data.data.movies);
        });
    });

    function searchMovie() {
      if (movieSearch.value === "") {
        alert("Enter some keywords");
        return;
      }
      err.value = false;
      showLoader.value = true;
      movieData.value = [];
      fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${movieSearch.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.movies == undefined) {
            showLoader.value = false;
            showSort.value = false;
            err.value = true;
            return;
          }
          showLoader.value = false;
          showSort.value = true;
          movieData.value.push(data.data.movies);
        });
    }

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
      searchMovie,
      movieSearch,
      viewMovie,
      closeBtn,
      movieDetails,
      popShow,
      showLoader,
      showSort,
      sort,
      sortByScore,
      checkScore,
      err,
    };
  },
};
</script>

<style scoped>
.flex-input {
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0 30px;
  display: flex;
  justify-content: center;
}

.flex-input input {
  width: 100%;
  font-size: 1.2rem;
  padding: 8px 5px;
  margin-right: 10px;
  border: solid 3px #2c3e50;
  border-radius: 5px;
  outline: none;
}

.flex-input input:focus {
  box-shadow: 0 0 5px 2px rgba(44, 62, 80, 0.7);
}

.flex-input button {
  background: #2c3e50;
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.flex-input button:hover {
  background: #253342;
}

.error-message {
  margin: 2rem 0;
}

@media (max-width: 900px) {
  .flex-input {
    padding: 0;
    flex-direction: column;
  }

  .flex-input input {
    width: 100%;
  }
}
</style>
