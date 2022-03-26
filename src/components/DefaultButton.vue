<template>
  <div
    :style="'width: ' + (width ? width + 'px;' : 'auto;')"
    class="radius-12 is-clickable flex-justify-center default-button"
    :class="isForm ? 'formButton' : ''"
  >
    <i :class="icon + ' flex-justify-center icon'"></i>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    text: String,
    icon: String,
    width: String,
    isForm: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  padding: 0 5px 0 0;
}

.default-button {
  height: 50px;
  padding: 0 20px;
  background-color: $primaryColor;
  color: $blackColor;
  font-size: 16px;
  font-family: "Roboto-Bold", sans-serif;
}

.default-button:hover {
  background-color: $yellowColor;
}

.formButton {
  margin: 29px 0 0 6px;
  border: 1px solid $primaryColor;
}
</style>
