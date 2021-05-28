<template>
  <div class="heading">
    <span>Made by Godfrey Necesario</span>
    <h1>Movies DB</h1>
  </div>
  <div class="flex">
    <div id="nav">
      <router-link to="/">Search a movie</router-link>
      <router-link to="/SuggestedMovie">Suggested movie</router-link>
    </div>
    <router-view class="view" />
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      document.title = to.meta.title || "Your Website";
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1440px;
  margin: auto;
}

p,
span,
li,
button {
  font-weight: 400;
}

h2,
h3,
h4 {
  font-weight: 300;
}

.heading {
  padding: 5rem 30px;
}

.heading span {
  font-size: 1.2rem;
  display: block;
  margin-bottom: 10px;
}

.heading h1 {
  font-size: 5rem;
  font-weight: 300;
}

.flex {
  display: flex;
  margin-top: 2rem;
  padding: 0 30px;
}

.box-overlay,
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: 250ms ease-in;
  z-index: 600;
}

.box-overlay {
  z-index: 500;
}

.overlay.active {
  opacity: 1;
  pointer-events: all;
}

.box-overlay {
  position: absolute;
}

#nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #2c3e50;
  border-radius: 5px;
  max-width: 300px;
  min-height: 500px;
  max-height: 500px;
  padding: 1rem 0;
}

#nav a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 10px 0;
}

#nav a.router-link-exact-active {
  color: #2c2c2c;
  background: #42b983;
}

.view {
  flex: 3;
}

.movie-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 30px 2rem 30px;
}

.box {
  text-align: left;
  border: solid 8px #2c2c2c;
  min-height: 200px;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: 200ms ease-in;
}

.box:hover {
  border: solid 8px #42b983;
}

.box:hover .box-overlay {
  opacity: 1;
  pointer-events: all;
}

.box:hover .details {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.box .details {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
  text-align: center;
  color: #fff;
  width: 100%;
  opacity: 0;
  transition: 250ms ease-in;
  z-index: 550;
  padding: 0 10px;
}

.box img {
  width: 100%;
  height: 100%;
}

.box h4 {
  font-size: 1.5rem;
  font-weight: 400;
}

.box span {
  display: block;
  margin: 10px 0;
  font-size: 1.2rem;
  font-weight: 300;
}

.box p {
  font-size: 1.5rem;
  font-weight: 700;
}

.box button {
  padding: 10px 20px;
  background: #42b983;
  color: #fff;
  border: solid 1px transparent;
  outline: none;
  margin: 10px 0;
  font-size: 1rem;
  border-radius: 3px;
  cursor: pointer;
}

.box button:hover {
  background: #2e835d;
}

@media (max-width: 900px) {
  .heading {
    padding: 3rem 30px;
  }

  .flex {
    padding: 0 15px;
  }

  .heading span {
    font-size: 1rem;
  }

  .heading h1 {
    font-size: 3rem;
  }

  .flex {
    flex-direction: column;
    align-items: center;
  }

  .view {
    width: 100%;
  }

  #nav {
    margin-bottom: 1rem;
    width: 100%;
    max-width: 100%;
    min-height: 100%;
  }

  .flex input {
    margin-right: 0 !important;
    margin-bottom: 10px;
  }

  .flex button {
    width: 100%;
  }

  .pop-up {
    padding: 1.5rem;
    width: 90%;
    height: 500;
    overflow: auto;
  }

  .pop-up .flex-btn {
    flex-direction: column;
  }

  .pop-up .yts-links li {
    margin: 10px 0;
  }

  .pop-up .flex-btn button {
    width: 100%;
    margin: 10px 0;
  }
}

@media (max-width: 650px) {
  .movie-wrap {
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 0;
  }

  .box {
    height: 400px;
    width: 250px;
  }
}
</style>
