<template>
  <menu class="flex-column-between">
    <div class="w-100 flex-column-center">
      <div class="logo-box flex-justify-center">
        <img alt="logo" src="../assets/images/logo.png" />
      </div>
      <ul class="w-100">
        <MenuItem
          :name="'Página Principal'"
          :route_name="{ name: 'HomePage', params: { id: Number } }"
          :icon="'fas fa-home'"
        />
        <MenuItem
          :name="'Cadastro de Vulnerabilidade'"
          :route_name="{
            name: 'VulnerabilityRegistration',
            params: { id: Number },
          }"
          :icon="'fas fa-plus'"
        />
        <MenuItem
          notClickable
          :name="'Ediçao de Vulnerabilidade'"
          :route_name="{ name: 'UpdateVulnerability', params: { id: Number } }"
          :icon="'fas fa-pen'"
        />
      </ul>
    </div>
    <div class="flex-justify-start w-100">
      <img width="" alt="logo" src="../assets/images/batman.png" />
    </div>
  </menu>
</template>

<script>
import MenuItem from "../components/others/MenuItem";

export default {
  name: "Menu",
  components: { MenuItem },
};
</script>

<style scoped lang="scss">
menu {
  background-color: $blackColor;
  color: black;
  height: 100%;
  border-radius: 0 30px 30px 0;
  font-size: 18px;
  width: 350px;
  z-index: 10;
}

.logo-box {
  margin: 20px 0 40px;
  height: 125px;
  padding: 5px 10px;
  border-radius: 25px;
  background-color: $primaryColor;
  transition: 0.5s;
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
