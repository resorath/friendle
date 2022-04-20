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

  props: ['content', 'letterClass'],

  mounted() {
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
    transition: transform 0.8s;
}

.letterCorrect {
    -webkit-animation: flip-correct 0.8s;
    -webkit-animation-fill-mode: forwards;
    animation: flip-correct 0.8s;
    animation-fill-mode: forwards;
}

.letterMisaligned {
    -webkit-animation: flip-misaligned 0.8s;
    -webkit-animation-fill-mode: forwards;
    animation: flip-misaligned 0.8s;
    animation-fill-mode: forwards;
}

.letterBad { 
    -webkit-animation: flip-bad 0.8s;
    -webkit-animation-fill-mode: forwards;
    animation: flip-bad 0.8s;
    animation-fill-mode: forwards;
}



.keyBad { 
  background-color: lightgrey !important;
}

.keyMisaligned {
  background-color: yellow !important;
}

.keyCorrect {
  background-color: lime !important;
}
</style>

<template>
  <div class="letter" :class="letterClass">{{content}}</div>
</template>