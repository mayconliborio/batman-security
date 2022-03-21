<template>
  <div>
    <v-text-field v-model="text" :label="label"> </v-text-field>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    label: String,
    valueField: String,
  },
  data() {
    return {
      text: this.valueField || "",
    };
  },
};
</script>
