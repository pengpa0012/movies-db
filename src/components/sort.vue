<template>
  <div class="filter">
    <span>Sort by Ratings</span>
    <input type="checkbox" @click="$emit('check-score')" />
  </div>
</template>

<script></script>

<style scoped>
.filter {
  display: flex;
  padding: 0 30px;
  margin-bottom: 1rem;
}

.filter span {
  margin-right: 10px;
}

@media (max-width: 650px) {
  .filter {
    justify-content: center;
  }
}
</style>
