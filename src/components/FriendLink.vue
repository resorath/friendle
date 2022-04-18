<script>
import { store } from '../store.js'

export default {

  components: {
  },

  data() {
    return {
      store: store,
      modalUp: false,
      friendsGameCode: ''
    }
  },

  mounted() {
  },

  watch: {
  },

  emits: [ 'setBoardIndex' ],

  methods: {
      friendInteraction() {
          this.modalUp = true;
      },

      newRandomGameCode() {
          var maxSize = this.store.state.dictionarySize;

          var random = Math.floor(Math.random() * maxSize);

          this.modalUp = false;
          this.$emit('setBoardIndex', random)
      },

      startFriendGame() {

          if(this.friendsGameCode >= 0 && this.friendsGameCode <this.store.state.dictionarySize)
          {
            this.modalUp = false;
            this.$emit('setBoardIndex', this.friendsGameCode)
          }
          else
          {
              this.friendsGameCode = '';
          }
      },

      closeModal() {
          this.modalUp = false;
      }


  }

}


</script>

<style scoped>
    #friendLink {
        position: absolute;
        top: 0;
        right: 50%;
        transform: translateX(50%);
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 600px;
        background-color: #FFFFFF;
        border: 2px solid black;
        z-index: 50;
    }

    #currentGameCode {
        margin-top: 40px;
    }

    #enterFriendCode {
        margin-top: 40px;
        display: block;
        width: 100%;
    }

    #enterFriendCodeInput {
        -moz-appearance:textfield;
        width: 40%;
        display: inline-block;
    }
    #enterFriendCodeInput::-webkit-outer-spin-button,
    #enterFriendCodeInput::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    #cancel {
        display: block;
        margin: 0 auto;
        
        margin-top: 40px;
    }



</style>

<template>
  <i class="fa-solid fa-gear" @click="friendInteraction" style="cursor: pointer;"></i>
  <div id="friendLink" v-if="modalUp">
      <h2>Play with a friend!</h2>
      <p id="currentGameCode">Current game code: {{store.state.wordIndex}}</p>
      <button id="newGameCode" @click="newRandomGameCode">New random game code</button>
      <p id="enterFriendCode">Enter friend's game code: </p>
      <input id="enterFriendCodeInput" type="number" v-model="friendsGameCode" onkeypress="return /[0-9]/i.test(event.key)"><button @click="startFriendGame">Go!</button>
    <button id="cancel" @click="closeModal">Cancel</button>
  </div>
</template>