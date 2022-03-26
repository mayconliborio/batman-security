<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          cols="4"
          placeholder="Vulnerabilidade 1..."
          @update="vulnerabilityTitle = $event"
          label="Título"
        />
        <SelectField
          :col="3"
          :items="criticalityLevelList"
          @update="criticalityLevel = $event"
          label="Grau de Criticidade"
        />
        <SelectField
          :col="3"
          @update="vulnerabilityType = $event"
          :items="vulnerabilityTypeList"
          label="Tipo de Vulnerabilidade"
        />
        <DefaultButton
          icon="fas fa-search"
          text="Buscar"
          isForm
          @click="$emit('searchVulnerabilities', updatedValues)"
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

export default {
  name: "SearchForm",
  components: { DefaultButton, TextField, SelectField },
  mixins: [GlobalData],
  data() {
    return {
      vulnerabilityTitle: String,
      vulnerabilityType: {},
      criticalityLevel: {},
    };
  },
  computed: {
    updatedValues() {
      return {
        vulnerabilityTitle: this.vulnerabilityTitle,
        vulnerabilityType: this.vulnerabilityType,
        criticalityLevel: this.criticalityLevel,
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
