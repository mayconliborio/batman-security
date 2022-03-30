<template>
  <menu class="flex-column-between">
    <div class="w-100 flex-column-center">
      <div class="logo-box flex-column-center">
        <img alt="logo" src="../assets/images/logo.png" />
      </div>
      <h3 class="logo-name">Batman Security</h3>
      <ul class="w-100">
        <MenuItem
          :name="'Página Principal'"
          :route_name="{ name: 'HomePage' }"
          :icon="'fas fa-home'"
        />
        <MenuItem
          :name="'Cadastro de Vulnerabilidade'"
          :route_name="{
            name: 'VulnerabilityRegistration',
          }"
          :icon="'fas fa-plus'"
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
import GlobalMethods from "../mixins/GlobalMethods";
import { mapState } from "vuex";

export default {
  name: "Menu",
  components: { MenuItem },
  mixins: [GlobalMethods],
  computed: {
    ...mapState({
      goBackHome: (state) => state.goBackHome,
    }),
    backHome() {
      return this.goBackHome;
    },
  },
  watch: {
    backHome(newValue) {
      if (newValue === true) {
        this.goToHomePage();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("http://fonts.cdnfonts.com/css/batman-forever");

menu {
  background-color: $blackColor;
  color: black;
  height: 100%;
  border-radius: 0 30px 30px 0;
  font-size: 18px;
  width: 350px;
  z-index: 10;
}

.logo-name {
  font-family: "BatmanForeverAlternate", sans-serif;
  color: $primaryColor;
  font-weight: 400;
  margin-top: 10px;
  font-size: 26px;
  margin-bottom: 40px;
}

.logo-box {
  margin: 20px 0 0;
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
