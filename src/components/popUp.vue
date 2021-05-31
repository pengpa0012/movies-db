<template>
  <div
    :style="{
      background: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)),url('${movieDetails.background_image}') no-repeat`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div>
      <h2>{{ movieDetails.title }}</h2>
      <ul class="yts-genres">
        <li>Genres :</li>
        <li v-for="genre in movieDetails.genres" :key="genre" class="genre">
          {{ genre }}
        </li>
      </ul>
      <h4>Available in:</h4>
      <ul class="yts-links">
        <li
          class="link"
          v-for="torrent in movieDetails.torrents"
          :key="torrent"
        >
          <a :href="torrent.url">
            <span>
              {{ torrent.quality }}
            </span>
          </a>
        </li>
      </ul>
      <div class="flex-btn">
        <button @click="$emit('close-btn')">Close</button>
        <button class="yts-btn">
          <a :href="movieDetails.url" target="_blank">
            View on YTS
          </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popUp",
  props: { movieDetails: Object },
};
</script>

<style scoped>
.pop-up {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 1000px;
  min-height: 500px;
  transform: translate(-50%, -50%) scale(0);
  background: #2e2e2e;
  color: #fff;
  border-radius: 5px;
  padding: 3rem 2rem;
  transition: 250ms ease-in;
  z-index: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pop-up h2 {
  font-size: 2rem;
}

.pop-up h4 {
  font-size: 1.25rem;
  font-weight: 500;
}

.pop-up a {
  text-decoration: none;
  color: #fff;
}

.pop-up ul {
  display: flex;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.pop-up li {
  list-style: none;
  margin: 8px 5px;
}

.pop-up .yts-genres .genre {
  background: #fff;
  border-radius: 3px;
  color: #000;
  font-size: 0.9rem;
  padding: 5px;
}

.pop-up .yts-links .link span {
  border: solid 1px transparent;
  color: #fff;
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 0.9rem;
}

.pop-up .yts-links .link span:hover {
  border: solid 1px #fff;
  opacity: 0.8;
}

.pop-up .flex-btn {
  display: flex;
  justify-content: center;
}

.pop-up .flex-btn button {
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px;
  font-size: 0.9rem;
}

.pop-up .flex-btn button:hover {
  background: #dfdede;
}

.pop-up .flex-btn .yts-btn {
  background: #42b983;
  color: #fff;
}

.pop-up .flex-btn .yts-btn:hover {
  background: #2e835d;
}

.pop-up.active {
  transform: translate(-50%, -50%) scale(1);
}
@media (max-width: 900px) {
  .pop-up {
    padding: 1.5rem;
    width: 90%;
    height: 500;
    overflow: auto;
  }

  .pop-up .flex-btn {
    flex-direction: column;
  }

  .pop-up .flex-btn button {
    width: 100%;
    margin: 5px 0;
  }
}
</style>
