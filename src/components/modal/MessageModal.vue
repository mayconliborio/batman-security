<template>
  <div class="background flex-justify-center">
    <div class="message-modal flex-column-between">
      <div class="content-modal h-100 flex-column-between">
        <h6 class="header flex-justify-start">{{ header }}</h6>
        <h4 class="title flex-justify-center">{{ title }}</h4>
        <div class="messages-box h-50 flex-column-center">
          <span
            class="message flex-justify-center"
            :key="message"
            v-for="message in messages"
          >
            {{ message }}
          </span>
        </div>
        <div class="buttons w-100 flex-justify-around">
          <DefaultButton
            text="Entendi"
            width="240px"
            @click="$emit('confirm')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "../buttons/DefaultButton";

export default {
  name: "MessageModal",
  components: { DefaultButton },
  props: {
    header: String,
    title: String,
    messages: Array,
    warning: Boolean,
  },
};
</script>

<style scoped lang="scss">
.background {
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100vh;
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
}

* {
  font-family: "Roboto Black", sans-serif;
  color: $textColor;
}

.message-modal {
  background-color: $blackColor;
  border-radius: 20px;
  min-width: 350px;
  width: auto;
  max-width: 450px;
  min-height: 350px;
  height: auto;
  max-height: 700px;
}

.header {
  font-size: 24px;
  color: $primaryColor;
  font-weight: bold;
  padding: 30px 20px 0;
}
.title {
  text-align: center;
  padding: 30px 20px;
  word-break: break-word;
}
.message {
  text-align: center;
  word-break: break-word;
  padding-bottom: 8px;
}

.messages-box {
  padding: 0 20px 30px;
}

.buttons {
  padding: 0 20px 30px;
}
</style>
