<template>
  <router-link
    :data-cy="name + '-MenuItem'"
    :key="name"
    tag="li"
    :to="route_name"
    class="flex-justify-start radius-12"
    :class="notClickable ? 'is-not-clickable' : ' is-clickable'"
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
    route_name: [Object, String],
    icon: String,
    notClickable: Boolean,
  },
};
</script>

<style scoped lang="scss">
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

li {
  width: 90%;
  height: 60px;
  margin-left: 5%;
  margin-bottom: 10px;
  padding: 0 0 0 20px;
  transition: 200ms;
  color: $textColor;
}

li:hover,
li.router-link-active {
  background-color: $secondaryColor;
  transition: 700ms;
}
</style>
