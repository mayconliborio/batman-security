<template>
  <div class="template">
    <section class="container-page flex-justify-start">
      <!-- Menu -->
      <div class="container-menu">
        <Menu class="menu flex-column-center"></Menu>
      </div>

      <!-- Conteudo a Exibir  -->
      <div class="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import Menu from "../views/Menu";

export default {
  name: "Template",
  components: { Menu },
};
</script>

<style scoped>
.template {
  min-height: 100vh;
}

.container-page {
  z-index: 7;
  position: absolute;
  height: 100vh;
  top: 0;
  width: 100%;
}

.container-menu {
  height: 100vh;
}

.content {
  width: 100%;
  height: 100vh;
  flex: 1;
}
</style>
