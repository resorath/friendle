<script>
import WordLine from './components/WordLine.vue'
import SimpleKeyboard from './components/SimpleKeyboard.vue'

export default {
  name: 'App',
  components: {
    WordLine,
    SimpleKeyboard
  },

  data() {
    return {
      input: "",
      currentWordLineIndex: 0
    }
  },

  created() {
    window.addEventListener('keydown', (e) => {
      this.onKeyPress(e.key);
    })
  },

  methods: {

    onKeyPress(button) {
      this.$refs.wl[this.currentWordLineIndex].changeNextLetter(button);
    },

    checkWord(word) {
      this.currentWordLineIndex++;
      console.log(word);
    }


  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.WordLine {
  width: 80%;
  margin: 0 auto;
  display: block;
}

.simple-keyboard {
  max-width: 550px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>

<template>
  <div id="app" class="container">
    <h1>Friendle</h1>
    <WordLine v-for="n in 6" class="WordLine" ref="wl" :key="n"  @checkWord="checkWord"/>
    
    <SimpleKeyboard class="SimpleKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="input"/>
  </div>
</template>