<script>
import { store } from '../store.js'

export default {

  components: {
  },

  data() {
    return {
      word: store.state.word
    }
  },

  props: ['content'],

  mounted() {
    console.log(store);
  },

  watch: {
      content(oldContent) {
          console.log("Setting " + oldContent);
      }
  }

}


</script>

<style>
    .letter {
        width: 15%;
        height: 50px;
        max-width: 50px;
        border: 1px solid grey;
        display: inline-block;
        margin: 5px;
        font-size: 2em;
        text-align: center;
        text-transform: uppercase;
        vertical-align: top;
    }
</style>

<template>
  <div class="letter">{{content}}</div>
</template>