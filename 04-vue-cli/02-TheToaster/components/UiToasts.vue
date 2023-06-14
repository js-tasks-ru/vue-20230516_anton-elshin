<template>
  <div class="toasts">
    <UiToast v-for="toast in toasts" :type="toast.type" :icon="toast.icon" :message="toast.message" :key="toast.id"/>
  </div>
</template>

<script>
import UiToast from "./UiToast";

export default {
  name: "UiToasts",

  components: { UiToast },

  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
