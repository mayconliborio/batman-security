<template>
  <div
    :data-cy="text + '-button'"
    :style="'width: ' + (width ? width + 'px;' : 'auto;')"
    class="radius-12 is-clickable flex-justify-center default-button"
    :class="
      (isForm ? 'formButton' : '') +
      (secondaryButton ? ' secondary-button' : '')
    "
    @click="$emit('click')"
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
    secondaryButton: {
      type: Boolean,
      default: false,
    },
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
  line-height: 16px;
  background-color: $primaryColor;
  color: $blackColor;
  font-size: 16px;
  font-family: "Roboto Black", sans-serif;
  border: 1px solid $primaryColor;
  font-weight: bold;
}

.secondary-button {
  background-color: transparent;
  color: $primaryColor;
}

.secondary-button:hover {
  color: $blackColor;
}

.default-button:hover {
  background-color: $yellowColor;
}

.formButton {
  margin: 29px 0 0 6px;
}
</style>
