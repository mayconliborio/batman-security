<template>
  <menu class="flex-column-start">
    <div class="logo-box flex-column-center">
      <img width="150" alt="logo" src="../assets/images/logo.png" />
      <!--<span class="sub-title">Batman Security</span>-->
    </div>
    <ul class="w-100">
      <MenuItem
        :name="'Listar Vulnerabilidades'"
        route_name="ListVulnerabilities"
        :icon="'fas fa-list'"
      />
      <MenuItem
        :name="'Cadastrar Vulnerabilidade'"
        route_name="RegisterVulnerability"
        :icon="'fas fa-plus'"
      />
      <MenuItem
        :name="'Alterar Vulnerabilidade'"
        route_name="UpdateVulnerability"
        :icon="'fas fa-pencil-alt'"
      />
      <MenuItem
        :name="'Excluir Vulnerabilidade'"
        route_name="DeleteVulnerability"
        :icon="'fas fa-trash'"
      />
    </ul>
  </menu>
</template>

<script>
import MenuItem from "../components/MenuItem";

export default {
  name: "Menu",
  components: { MenuItem },
};
</script>

<style scoped lang="scss">
menu {
  background-color: $backgroundColor;
  color: black;
  height: 100%;
  border-radius: 0 15px 15px;
  font-size: 23px;
  width: 350px;
  z-index: 10;
}

.logo-box {
  margin: 20px 0 40px;
  color: orange;
}

ul {
  width: 100%;
}

menu::-webkit-scrollbar {
  width: 0;
  height: 0;
}

menu::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>
