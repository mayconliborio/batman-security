<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          cols="4"
          placeholder="Vulnerabilidade 1..."
          @update="title = $event"
          label="Título"
        />
        <SelectField
          :col="3"
          @update="criticalityLevel = $event"
          :items="criticalityLevelList"
          label="Grau de Criticidade"
        />
        <SelectField
          :col="3"
          @update="type = $event"
          :items="vulnerabilityTypeList"
          label="Tipo de Vulnerabilidade"
        />
        <DefaultButton
          icon="fas fa-search"
          text="Buscar"
          isForm
          @click="searchVulnerabilities"
        />
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import SelectField from "../fields/SelectField";
import TextField from "../fields/TextField";
import DefaultButton from "../buttons/DefaultButton";
import GlobalData from "../../mixins/GlobalData";
import { mapActions } from "vuex";

export default {
  name: "SearchForm",
  components: { DefaultButton, TextField, SelectField },
  mixins: [GlobalData],
  data() {
    return {
      title: String,
      type: {},
      criticalityLevel: {},
    };
  },
  mounted() {
    this.searchVulnerabilities();
  },
  methods: {
    ...mapActions(["action_setFilters"]),
    searchVulnerabilities() {
      console.log("opa");
      this.action_setFilters(this.filters);
    },
  },
  computed: {
    filters() {
      return {
        title: this.title,
        type: this.type.value,
        criticalityLevel: this.criticalityLevel.value,
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.search-box {
  align-items: flex-start !important;
}
</style>
