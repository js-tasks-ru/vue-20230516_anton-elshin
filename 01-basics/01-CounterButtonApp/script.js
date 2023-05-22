import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    increment() {
      return this.counter++;
    }
  },

});

const app = createApp(App);

const vm = app.mount('#app');

window.vm = vm;
