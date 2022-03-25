<template>
  <div id="home-page">
    <div class="header">
      <div class="title-line flex-justify-between">
        <v-col cols="">
          <h1>Lista de Vulnerabilidade</h1>
        </v-col>
        <DefaultButton icon="fas fa-plus" text="Adicionar Vulnerabilidade" />
      </div>
      <v-form class="w-100 flex-justify-start search-box">
        <v-container>
          <v-row>
            <TextField
              :col="4"
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
            <DefaultButton icon="fas fa-search" text="Buscar" isForm />
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import TextField from "../components/fields/TextField.vue";
import DefaultButton from "../components/DefaultButton.vue";
import SelectField from "../components/fields/SelectField";

export default {
  name: "HomePage",
  components: { SelectField, TextField, DefaultButton },
  data() {
    return {
      screenSize: {
        width: document.documentElement.clientWidth,
        heigth: document.documentElement.clientHeight,
      },
      vulnerabilityTitle: String,
      vulnerabilityType: {},
      vulnerabilityTypeList: [
        {
          name: "DAST",
          value: 1,
        },
        {
          name: "SAST",
          value: 2,
        },
        {
          name: "NETWORK",
          value: 3,
        },
      ],
      criticalityLevel: {},
      criticalityLevelList: [
        {
          name: "Low",
          value: 1,
        },
        {
          name: "Mid",
          value: 2,
        },
        {
          name: "High",
          value: 3,
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("resize", this.getDimensions);
  },
  methods: {
    getDimensions() {
      this.width = document.documentElement.clientWidth;
      this.heigth = document.documentElement.clientHeight;
    },
  },
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.search-box {
  align-items: flex-start !important;
}

#home-page {
  padding: 0 30px;
}

.header {
  color: $primaryColor;
}

.title-line {
  margin-bottom: 100px;
}
</style>
