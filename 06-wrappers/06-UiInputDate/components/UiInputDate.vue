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

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        if(this.modelValue) {
          const currentDateISO = new Date(new Date().setTime(this.modelValue)).toISOString();

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
        }

        return this.modelValue;
      },

      set() {
        this.$emit('update:modelValue', this.valueAsNumber());
      }
    }
  },

  components: { UiInput },

  methods: {
    valueAsNumber() {
      if(this.$refs.input?.$el) {
        for(let i=0; i<this.$refs.input.$el.childNodes.length; i++) {
          if(this.$refs.input.$el.childNodes[i].valueAsNumber) {
            return this.$refs.input.$el.childNodes[i].valueAsNumber;
          }
        }
      }

      return this.modelValue;
    },
  },
};
</script>
