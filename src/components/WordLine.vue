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
      wordLineValue: []
    }
  },

  mounted() {

    for(var i = 0; i < 5; i++)
    {
      this.wordLineValue.push({
        index: i,
        value: " ",
        class: "none"
      })
    }
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

    
    checkWord() {

      // word checking logic
      var that = this;
      this.wordLineValue.forEach(function(item) {
        
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