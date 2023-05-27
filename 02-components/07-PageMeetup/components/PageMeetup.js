import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
      default: 1
    }
  },

  data() {
    return {
      meetup: null,
      loading: true,
      error: ''
    }
  },

  methods: {
    fetchMeetup(meetupId) {
      this.meetup = null;
      this.loading = true;
      this.error = '';
      fetchMeetupById(meetupId).then(
        result => {
          this.meetup = result;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.error = error.toString().replace("Error: ", "");
        }
      );
    },
  },

  watch: {
    meetupId: {
      handler(newValue, oldValue) {
        this.fetchMeetup(newValue);
      }
    }
  },

  mounted() {
    this.fetchMeetup(this.meetupId);
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && !loading && error === ''" :meetup="meetup" />

      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="error !== ''">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
