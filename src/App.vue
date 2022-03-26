<template>
  <div id="app">
    <v-app>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.action_screenResize();
    window.addEventListener("resize", this.action_screenResize);
  },
  methods: {
    ...mapActions(["action_screenResize"]),
  },
};
</script>
