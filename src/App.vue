<script setup>
import HelloWorld from './components/HelloWorld.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import IndexedDBTrial from "./components/IndexedDBTrial.vue";
import IndexedDBUploadImage from "./components/IndexedDBUploadImage.vue";
</script>

<template>
<!--  <div>-->
<!--    <a href="https://vitejs.dev" target="_blank">-->
<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://vuejs.org/" target="_blank">-->
<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--    </a>-->
<!--  </div>-->
<!--  <HelloWorld msg="The Formula For Finding Magic-->
<!--  1 + 1 = Me And You" />-->
<!--  <reload-prompt/>-->
<!--  <indexed-d-b-trial/>-->
  <indexed-d-b-upload-image/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
