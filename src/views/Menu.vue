<template>
  <menu class="flex-column-between">
    <div class="w-100 flex-column-center">
      <div class="logo-box flex-justify-center">
        <img alt="logo" src="../assets/images/logo.png" />
      </div>
      <ul class="w-100">
        <MenuItem
          :name="'Página Principal'"
          route_name="HomePage"
          :icon="'fas fa-home'"
        />
      </ul>
    </div>
    <div class="flex-justify-start w-100">
      <img width="" alt="logo" src="../assets/images/batman.png" />
    </div>
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
  background-color: $blackColor;
  color: black;
  height: 100%;
  border-radius: 0 35px 35px 0;
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
