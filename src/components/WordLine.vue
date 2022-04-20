<script>
import { store } from '../store.js'
import WordLetter from './WordLetter.vue'
import dictionary from '../assets/dictionary.json'

export default {

  components: {
    WordLetter
  },

  data() {
    return {
      word: store.state.word,
      currentLetterIndex: 0,
      wordLineValue: [],
      dictionary: dictionary,
      currentClass: ''
    }
  },

  mounted() {

    this.resetWord();
  },

  emits: ['checkWord', 'letterCorrect', 'letterMisaligned', 'letterBad'],

  methods: {
    changeNextLetter(letter) {

      if(this.currentLetterIndex > 0 && (letter == "Backspace" || letter == "{bksp}"))
      {
        this.currentLetterIndex--;
        this.wordLineValue[this.currentLetterIndex].value = ' ';
        return;
      }

      if(this.currentLetterIndex >= 5 && (letter == "Enter" || letter == "{enter}"))
      {
        this.checkWord();
        return;
      }

      if(this.currentLetterIndex >= 5)
        return;

      const validLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      if(!validLetters.includes(letter))
        return;
      
      this.wordLineValue[this.currentLetterIndex].value = letter;
      this.currentLetterIndex++;
    },

    resetWord() {
      this.wordLineValue = [];
      for(var i = 0; i < 5; i++)
      {
        this.wordLineValue.push({
          index: i,
          value: " ",
          class: "letterUnset"
        })
      }
      this.currentLetterIndex = 0;
    },

    
    checkWord() {

      // word checking logic
      var mergedWord = "";
      this.wordLineValue.forEach(function(item) {
        mergedWord += item.value;
      })

      if(!dictionary.includes(mergedWord))
      {
        // doesn't exist
        this.shake();
        this.resetWord();
        return;
      }


      var that = this;
      this.wordLineValue.forEach(function(item) {

        window.setTimeout(function() {
        
          if(item.value == store.state.word[item.index])
          {
            that.wordLineValue[item.index].class = "letterCorrect"

            that.$emit('letterCorrect', item.index, item.value);
          }
          else if(store.state.word.includes(item.value))
          {
            that.wordLineValue[item.index].class = "letterMisaligned"

            that.$emit('letterMisaligned', item.index, item.value);
          }
          else
          {
            that.wordLineValue[item.index].class = "letterBad"
          
            that.$emit('letterBad', item.index, item.value);
          }
        }, 200 * item.index)


      });


      this.$emit('checkWord', this.wordLineValue);
    },

    
    shake() {
      this.currentClass = 'shake';
      var that = this;
      window.setTimeout(function() {
        that.currentClass = '';
      }, 500);
    }

  },



}


</script>

<style>
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  
.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>

<template>
    <div :class="currentClass">
      <WordLetter v-for="item in wordLineValue" :key="item.index" :content="item.value" :letterClass="item.class" />
    </div>
</template>