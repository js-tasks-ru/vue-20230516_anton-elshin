import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  methods: {
    update(value) {
      this.$emit('update:count', ++value);
    },
  },

  template: `<button type="button" @click="update(count)">{{ count }}</button>`,
});
