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
      dictionary: dictionary
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
    }

  },




}


</script>

<style>

</style>

<template>
    <div>
      <WordLetter v-for="item in wordLineValue" :key="item.index" :content="item.value" :class="item.class" ref="letterRef" />
    </div>
</template>