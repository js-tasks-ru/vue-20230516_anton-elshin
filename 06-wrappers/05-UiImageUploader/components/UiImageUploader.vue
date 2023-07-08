<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading' : loading }" :style="`--bg-url: url(${link})`">
      <span class="image-uploader__text">{{ title }}</span>
      <input ref="fileUploader" type="file" accept="image/*" class="image-uploader__input" v-bind="$attrs" @change="changeFile" @click="clearFile"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  data() {
    return {
      link: this.preview ? this.preview : "var(--bg-url)",
      title: !this.preview ? 'Загрузить изображение' : 'Удалить изображение',
      loading: false,
    }
  },

  emits: ['select', 'upload', 'error', 'remove'],

  methods: {
    changeFile(event) {
      if(event.target.files.length > 0 && this.$refs.fileUploader.value !== '') {
        let file = event.target.files[0];
        this.$emit('select', file);
        if(this.uploader) {
          this.title = 'Загрузка...';
          this.loading = true;
          this.uploader(file)
            .then(
              result => {
                this.title = 'Удалить изображение';
                this.link = URL.createObjectURL(file);
                this.$emit('upload', result);
              },
              error => {
                this.title = 'Загрузить изображение';
                this.$refs.fileUploader.value = null;
                this.$emit('error', error);
              }
            )
            .finally(() => {
              this.loading = false;
            });
        }
        else {
          this.title = 'Удалить изображение';
          this.link = URL.createObjectURL(file);
        }
      }
    },
    clearFile(event) {
      if(!this.loading) {
        this.title = 'Загрузить изображение';
        if(event.target.files.length > 0 || this.link === this.preview) {
          event.preventDefault();
          this.$refs.fileUploader.value = null;
          this.$emit('remove');
        }
        this.link = "var(--bg-url)";
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
