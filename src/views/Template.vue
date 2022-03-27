<template>
  <div class="template">
    <section class="container-page flex-justify-start">
      <!-- Menu -->
      <div class="container-menu">
        <Menu class="menu flex-column-center"></Menu>
      </div>

      <!-- Conteudo a Exibir  -->
      <div class="content">
        <MessageSnackbar
          v-if="snackBar.show"
          :message="snackBar.message"
          :sucess="snackBar.sucess"
        />
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import Menu from "../views/Menu";
import MessageSnackbar from "../components/others/MessageSnackBar";
import { mapState } from "vuex";

export default {
  name: "Template",
  components: { MessageSnackbar, Menu },
  computed: {
    ...mapState({
      snackBar: (state) => state.snackBar,
    }),
  },
};
</script>

<style scoped>
.template {
  min-height: 100vh;
}

.container-page {
  position: absolute;
  height: 100%;
  top: 0;
  width: 100%;
}

.container-menu {
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
}
</style>
