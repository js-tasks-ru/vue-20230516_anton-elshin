import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';
const MAX_MEETUPS = 5;
const meetupsIds = Array(MAX_MEETUPS)
  .fill()
  .map((_, i) => i + 1);

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const App = defineComponent({
  name: 'App',

  data() {
    return {
      meetups: meetupsIds,
      meetupId: 0,
      title: '',
    };
  },

  watch: {
    meetupId: {
      handler(newValue, oldValue) {
        fetchMeetupById(newValue).then((meetup) => {
          this.title = meetup.title;
        });
      }
    }
  },
});

const app = createApp(App);

const vm = app.mount('#app');

window.vm = vm;
