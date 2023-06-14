<template>
  <UiToasts :toasts="toasts" />
</template>

<script>
import UiToasts from "./UiToasts";

export default {
  name: 'TheToaster',

  components: { UiToasts },

  data() {
    return {
      id: 0,
      toasts: []
    };
  },

  methods: {
    getId() {
      this.id += 1;
      return this.id;
    },
    addToast(toast) {
      this.toasts.push(toast);
      setTimeout(() => this.toasts = this.toasts.filter(item => item.id !== toast.id), toast.duration);
    },
    success(message) {
      this.addToast({
        id: this.getId(),
        type: 'success',
        icon: 'check-circle',
        message: message,
        duration: 5000,
      });
    },

    error(message) {
      this.addToast({
        id: this.getId(),
        type: 'error',
        icon: 'alert-circle',
        message: message,
        duration: 5000,
      });
    },
  },
};
</script>

<style scoped>

</style>
