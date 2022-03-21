<template>
  <router-link
    :key="name"
    tag="li"
    :to="route_name ? { name: route_name } : ''"
    class="flex-justify-start is-clickable menu-item"
  >
    <div class="flex-justify-around">
      <i :class="icon + ' flex-justify-center'"></i>{{ name }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    name: String,
    route_name: String,
    icon: String,
  },
};
</script>

<style scoped lang="scss">
li {
  width: 90%;
  height: 60px;
  margin-left: 5%;
  padding: 0 0 0 20px;
  border-radius: 30px;
  font-size: 20px;
  transition: 200ms;
}

li:hover {
  color: $primaryColor;
  transition: 200ms;
}

li div {
  font-family: "Roboto Light", sans-serif;
  line-height: 30px;
}

li div i {
  margin-right: 5px;
  font-size: 18px;
  width: 30px;
  height: 30px;
}

li.router-link-active {
  background-color: $primaryColor;
  color: #fff;
  transition: 700ms;
}

.menu-item {
  flex-direction: row;
}
</style>
