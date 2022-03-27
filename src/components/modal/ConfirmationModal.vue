<template>
  <div class="background flex-justify-center">
    <div class="confirmation-modal">
      <div class="content-modal h-100 flex-column-between">
        <h6 class="header flex-justify-start">{{ header }}</h6>
        <div class="messages-box h-50 flex-column-around">
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
            text="Não"
            secondaryButton
            width="120"
            @click="$emit('cancel')"
          />
          <DefaultButton text="Sim" width="120" @click="$emit('confirm')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "../buttons/DefaultButton";

export default {
  name: "ConfirmationModal",
  components: { DefaultButton },
  props: {
    header: String,
    messages: Array,
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

.confirmation-modal {
  background-color: $blackColor;
  border-radius: 20px;
  width: 350px;
  height: 350px;
}

.header {
  font-size: 24px;
  color: $primaryColor;
  font-weight: bold;
  padding: 30px 20px 0;
}

.message {
  text-align: center;
  word-break: break-word;
}
.messages-box {
  padding: 0 20px 0;
}
.buttons {
  padding: 0 20px 30px;
}
</style>
