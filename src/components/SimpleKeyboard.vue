<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
          default: [
              "q w e r t y u i o p {bksp}",
              "a s d f g h j k l",
              "z x c v b n m {enter}"
          ]
      },
      display: {
          '{enter}': "ENTER",
          '{bksp}': "<"
      },
      disableButtonHold: true,
      physicalKeyboardHighlight: true,

    });
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
    },
    addButtonTheme(keys, theme) {
        console.log(keys);
        console.log(theme);
        this.keyboard.addButtonTheme(keys, theme);
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
