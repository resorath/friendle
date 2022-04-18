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
      guesses: []
    }
  },
  mutations: {
    setWord (state, word) {
      state.word = word
    },

    addGuess (state, guess) {
        state.guesses.push(guess)
    },

    clearGuesses (state) {
        state.guesses = []
    }
  }
})
