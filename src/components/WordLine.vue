<script>
import { store } from '../store.js'
import WordLetter from './WordLetter.vue'

export default {

  components: {
    WordLetter
  },

  data() {
    return {
      word: store.state.word,
      currentLetterIndex: 0,
      wordLineValue: [' ',' ',' ',' ',' ']
    }
  },

  mounted() {
    console.log(store);
  },

  emits: ['checkWord'],

  methods: {
    changeNextLetter(letter) {

      if(this.currentLetterIndex >= 0 && (letter == "Backspace" || letter == "{bksp}"))
      {
        this.currentLetterIndex--;
        this.wordLineValue[this.currentLetterIndex] = ' ';
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
      
      this.wordLineValue[this.currentLetterIndex] = letter;
      this.currentLetterIndex++;
    },

    
    checkWord() {
      this.$emit('checkWord', this.wordLineValue);
    }

  },




}


</script>

<style>

</style>

<template>
    <div>
      <WordLetter v-for="(item, index) in wordLineValue" :key="index" :content="item" />
    </div>
</template>