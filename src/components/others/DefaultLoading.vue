<template>
  <div class="loading flex-justify-center">
    <v-progress-circular
      :size="50"
      indeterminate
      color="$primaryColor"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "DefaultLoading",
};
</script>

<style scoped>
.loading {
  width: 100%;
  padding: 30px 0;
}
</style>
