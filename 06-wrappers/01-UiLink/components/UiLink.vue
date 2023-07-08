<template>
  <component class="link" :is="tag">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type: String,
      default: "RouterLink",
    }
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
