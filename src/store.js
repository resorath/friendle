import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

// Create a new store instance.
export const store = createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    })],
  state () {
    return {
      word: null,
      wordIndex: 0,
      dictionarySize: 0,
      guesses: []
    }
  },
  mutations: {
    setWord (state, word) {
      state.word = word;
    },

    setWordIndex(state, index) {
        state.wordIndex = index;
    },

    addGuess (state, guess) {
        state.guesses.push(guess)
    },

    clearGuesses (state) {
        state.guesses = []
    },

    setDictionarySize(state, size) {
      state.dictionarySize = size;
    }
  }
})
