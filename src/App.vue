<script>
import WordLine from './components/WordLine.vue'
import SimpleKeyboard from './components/SimpleKeyboard.vue'
import VictoryAnimation from './components/VictoryAnimation.vue'
import FriendLink from './components/FriendLink.vue'
import dictionary from './assets/dictionary.json'
import { store } from './store.js'

export default {
  name: 'App',
  components: {
    WordLine,
    SimpleKeyboard,
    VictoryAnimation,
    FriendLink
  },

  data() {
    return {
      input: "",
      currentWordLineIndex: 0,
      correctLetters: 0,
      gameOver: false,
      didWin: false,
      store: store
    }
  },

  created() {
    window.addEventListener('keydown', (e) => {
      this.onKeyPress(e.key);
    })

  },

  mounted() {
    var count = dictionary.length;
    console.log("Loaded " + count + " words");
    this.store.commit('setDictionarySize', count);

    var random = Math.floor(Math.random() * count);

    this.setWordFromIndex(random);
  },

  methods: {

    onKeyPress(button) {
      if(button == "3")
        this.resetBoard();

      if(!this.gameOver)
        this.$refs.wl[this.currentWordLineIndex].changeNextLetter(button);
    },

    setWordFromIndex(index) {

      this.store.commit('setWord', dictionary[index]);
      this.store.commit('setWordIndex', index);

      console.log("Word is: " + this.store.state.word)

      this.resetBoard();
    },

    resetBoard() {

      for(var i = 0; i < 6; i++)
      {
        this.$refs.wl[i].resetWord();
      }
      this.currentWordLineIndex = 0;
      this.gameOver = false;
      this.didWin = false;

      this.$refs.kb.resetKeyboard();

    },

    checkWord(word) {

      var mergedWord = "";
      word.forEach(function(item) {
        mergedWord += item.value;
      })

      this.store.commit('addGuess', mergedWord);

      if(this.store.state.word == mergedWord)
      {
        console.log("WIN!@")
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
      this.$refs.kb.addButtonTheme(letter, 'keyCorrect');
      this.correctLetters++;
    },

    letterMisaligned(index, letter) {
      this.$refs.kb.addButtonTheme(letter, 'keyMisaligned');
    },

    letterBad(index, letter) {
      this.$refs.kb.addButtonTheme(letter, 'keyBad');
    },

    win() {
      this.gameOver = true;
      var that = this;
      window.setTimeout(function() {
        that.didWin = true;
      }, 2000)
    },

    lose() {
      this.gameOver = true;
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

@keyframes flip-correct {
  0% { transform: rotateX(0deg); background-color: white; }
  50% { transform: rotateX(90deg); background-color: white; }
  100% { transform: rotateX(0deg); background-color: lime;}
}

@keyframes flip-misaligned {
  0% { transform: rotateX(0deg); background-color: white; }
  50% { transform: rotateX(90deg); background-color: white; }
  100% { transform: rotateX(0deg); background-color: yellow;}
}

@keyframes flip-bad {
  0% { transform: rotateX(0deg); background-color: white; }
  50% { transform: rotateX(90deg); background-color: white; }
  100% { transform: rotateX(0deg); background-color: lightgrey;}
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

.keyCorrect {
  background-color: lime !important;
}

.keyMisaligned {
  background-color: yellow !important;
}

.keyBad { 
  background-color: lightgrey !important;
}

.letterUnset {
  background-color: white !important;
}



</style>

<template>
  <div id="app" class="container">
    <h1>Friendle <FriendLink @setBoardIndex="setWordFromIndex"/></h1>
    <WordLine v-for="n in 6" class="WordLine" ref="wl" :key="n" @checkWord="checkWord" @letterCorrect="letterCorrect" @letterMisaligned="letterMisaligned" @letterBad="letterBad"/>
    
    <SimpleKeyboard class="SimpleKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="input" ref="kb"/>

    <VictoryAnimation v-if="didWin"/>
  </div>
</template>