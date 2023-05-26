import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      calculator: {
        digit_1: 0,
        digit_2: 0,
        operator: 'sum',
      },
    };
  },

  computed: {
    result() {
      let res = 0;

      switch (this.calculator.operator) {
        case 'subtract':
          res = this.calculator.digit_1 - this.calculator.digit_2;
          break;
        case 'multiply':
          res = this.calculator.digit_1 * this.calculator.digit_2;
          break;
        case 'divide':
          if(this.calculator.digit_2 !== 0) {
            res = this.calculator.digit_1 / this.calculator.digit_2;
          }
          else {
            res = 'error';
          }
          break;
        default:
          res = this.calculator.digit_1 + this.calculator.digit_2;
          break;
      }

      return res;
    },
  },
});

const app = createApp(App);

const vm = app.mount('#app');

window.vm = vm;
