<template>
  <UiInput ref="input" v-model="modelValueProxy" v-bind="$attrs" :type="type" :step="step">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
    step: {
      type: String,
    }
  },

  watch: {
    modelValue: {
      deep: true,
      immediate: true,
      handler() {
        this.currentDate = this.modelValue ? new Date(new Date().setTime(this.modelValue)) : '';
      }
    }
  },

  data() {
    return {
      currentDate: this.modelValue ? new Date(new Date().setTime(this.modelValue)) : '',
    }
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        if(this.currentDate === '') {
          return '';
        }
        const currentDateISO = this.currentDate.toISOString();

        if(this.type === 'date') {
          return currentDateISO.slice(0, 10);
        }
        if(this.type === 'time' && (!this.step || this.step % 60 === 0)) {
          return currentDateISO.slice(11, 16);
        }
        else if(this.type === 'time' && this.step) {
          return currentDateISO.slice(11, 19);
        }
        else if(this.type === 'datetime-local') {
          return currentDateISO.slice(0, 10) + ' ' + currentDateISO.slice(11, 16);
        }

        return null;
      },

      set(value) {
        if(this.currentDate === '') {
          this.currentDate = new Date();
          this.currentDate.setHours(this.currentDate.getTimezoneOffset()/60 * -1);
          this.currentDate.setMinutes(0);
          this.currentDate.setSeconds(0);
          this.currentDate.setMilliseconds(0);
        }

        if(this.type === 'date') {
          const yyyy = value.slice(0, 4);
          const mm = parseInt(value.slice(5, 7)) - 1;
          const dd = parseInt(value.slice(8, 10));

          this.currentDate.setFullYear(yyyy);
          this.currentDate.setMonth(mm);
          this.currentDate.setDate(dd);
        }
        else if(this.type === 'time' && (!this.step || this.step % 60 === 0)) {
          const hh = parseInt(value.slice(0, 2));
          const mi = parseInt(value.slice(3, 5));

          this.currentDate.setHours(hh);
          this.currentDate.setMinutes(mi);
        }
        else if(this.type === 'time' && this.step) {
          const hh = parseInt(value.slice(0, 2));
          const mm = parseInt(value.slice(3, 5));
          const ss = parseInt(value.slice(6, 8));

          this.currentDate.setHours(hh);
          this.currentDate.setMinutes(mm);
          this.currentDate.setSeconds(ss);
        }
        else if(this.type === 'datetime-local') {
          const yyyy = value.slice(0, 4);
          const mm = parseInt(value.slice(5, 7)) - 1;
          const dd = parseInt(value.slice(8, 10));
          const hh = parseInt(value.slice(11, 13));
          const mi = parseInt(value.slice(14, 16));

          this.currentDate.setFullYear(yyyy);
          this.currentDate.setMonth(mm);
          this.currentDate.setDate(dd);
          this.currentDate.setHours(hh);
          this.currentDate.setMinutes(mi);
        }

        if(this.currentDate !== '') {
          this.$emit('update:modelValue', this.currentDate.getTime());
        }
        else {
          this.$emit('update:modelValue', '');
        }
      }
    }
  },

  components: { UiInput },
};
</script>
