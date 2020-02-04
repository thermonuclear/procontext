<template>
  <div id="app">
    <Forum />
  </div>
</template>

<script>
import Forum from "./components/Forum.vue";

export default {
  name: "app",
  components: {
    Forum
  }
};
</script>

<style>
  @import 'assets/normalize.css';
</style>
