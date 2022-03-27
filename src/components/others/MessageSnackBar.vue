<template>
  <div class="w-100 flex-justify-center">
    <div
      v-if="message && message.length > 0"
      class="snackbar flex-justify-center"
      :style="'background-color: ' + config.color + ';'"
    >
      <i :class="config.icon"></i>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageSnackbar",
  props: {
    message: String,
    sucess: Boolean,
  },
  data() {
    return {
      sucessColor: "#7aff67",
      dangerColor: "#ff5370",
    };
  },
  computed: {
    config() {
      let i = this.sucess ? "far fa-check-circle" : "far fa-times-circle";
      let c = this.sucess ? this.sucessColor : this.dangerColor;
      return { icon: i, color: c };
    },
  },
};
</script>

<style scoped lang="scss">
.snackbar {
  margin: 10px;
  padding: 10px 10px;
  text-align: center;
  top: 10px;
  position: absolute;
  font-family: "Roboto-Bold", sans-serif;
  color: $blackColor;
  border: 1px solid $blackColor;
  font-weight: bold;
  font-size: 20px;
  z-index: 999;
  border-radius: 10px;
  animation-name: upToDown;
  animation-duration: 5s;
}

@keyframes upToDown {
  0% {
    top: -200px;
  }
  10% {
    top: 14px;
  }
  15% {
    top: 6px;
  }
  20% {
    top: 12px;
  }
  25% {
    top: 8px;
  }
  30% {
    top: 10px;
  }
  40% {
    top: 10px;
  }
  60% {
    top: 10px;
  }
  80% {
    top: 10px;
  }
  90% {
    top: 14px;
  }
  100% {
    top: -200px;
  }
}

.snackbar i {
  margin-right: 10px;
  font-size: 20px;
}
</style>
