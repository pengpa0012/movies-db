<template>
  <div class="box" @click="$emit('view-movie', movieInfo)">
    <img :src="movieInfo.medium_cover_image" alt="poster" />
    <div class="details">
      <h4>{{ movieInfo.title }}</h4>
      <span>{{ movieInfo.year }}</span>
      <p>{{ movieInfo.rating }} / 10</p>
      <button @click="$emit('view-movie', movieInfo)">View Details</button>
    </div>
    <div class="box-overlay"></div>
  </div>
</template>

<script>
export default {
  name: "movieBox",
  props: {
    movieInfo: Object,
  },
};
</script>

<style scoped>
.box {
  max-width: 300px;
}
</style>
