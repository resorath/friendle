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
      currentWordLineIndex: 0,
      correctLetters: 0
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

      if(this.correctLetters == 5)
      {
        this.win();
        return;
      }

      if(this.currentWordLineIndex == 5)
      {
        this.lose();
        return;
      }
      this.currentWordLineIndex++;
      this.correctLetters = 0;
      console.log(word);
    },

    letterCorrect(index, letter) {
      this.$refs.kb.addButtonTheme(letter, 'letterCorrect');
      this.correctLetters++;
    },

    letterMisaligned(index, letter) {
      this.$refs.kb.addButtonTheme(letter, 'letterMisaligned');
    },

    letterBad(index, letter) {
      this.$refs.kb.addButtonTheme(letter, 'letterBad');
    },

    win() {
      alert("yay");
    },

    lose() {
      alert(" oh no !");
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
}

.letterCorrect {
    background-color: lime !important;
}

.letterMisaligned {
    background-color: yellow !important;
}

.letterBad { 
    background-color: lightgrey !important;;
}
</style>

<template>
  <div id="app" class="container">
    <h1>Friendle</h1>
    <WordLine v-for="n in 6" class="WordLine" ref="wl" :key="n"  @checkWord="checkWord" @letterCorrect="letterCorrect" @letterMisaligned="letterMisaligned" @letterBad="letterBad"/>
    
    <SimpleKeyboard class="SimpleKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="input" ref="kb"/>
  </div>
</template>