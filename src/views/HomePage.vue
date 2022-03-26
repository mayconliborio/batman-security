<template>
  <div id="home-page">
    <div class="header">
      <div class="title-line flex-justify-between">
        <v-col cols="">
          <h1>Lista de Vulnerabilidade</h1>
        </v-col>
        <DefaultButton
          @click="
            $router.push({
              name: 'RegisterVulnerability',
            })
          "
          icon="fas fa-plus"
          text="Adicionar Vulnerabilidade"
        />
      </div>
      <v-form class="w-100 flex-justify-start search-box">
        <v-container>
          <v-row>
            <TextField
              :col="4"
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
              @click="searchVulnerabilities"
            />
          </v-row>
        </v-container>
      </v-form>
    </div>
    <div id="tabela">
      <BatTable :header="tableHeader" :items="vulnerabilities" />
    </div>
  </div>
</template>

<script>
import TextField from "../components/fields/TextField.vue";
import DefaultButton from "../components/DefaultButton.vue";
import SelectField from "../components/fields/SelectField";
import BatTable from "../components/tables/BatTable";

export default {
  name: "HomePage",
  components: { SelectField, TextField, DefaultButton, BatTable },
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
          name: "Selecione",
          value: 0,
        },
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
          name: "Selecione",
          value: 0,
        },
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
      vulnerabilities: [
        {
          title: "Vulnerabilidade 1",
          criticalityLevel: 3,
          vulnerabilityType: 3,
          evidences: ["base64", "base64"],
        },
        {
          title: "Vulnerabilidade 2",
          criticalityLevel: 2,
          vulnerabilityType: 2,
          evidences: ["base64", "base64"],
        },
        {
          title: "Vulnerabilidade 3",
          criticalityLevel: 1,
          vulnerabilityType: 1,
          evidences: ["base64", "base64"],
        },
        {
          title: "Vulnerabilidade 3",
          criticalityLevel: 1,
          vulnerabilityType: 1,
          evidences: ["base64", "base64"],
        },
        {
          title: "Vulnerabilidade 3",
          criticalityLevel: 1,
          vulnerabilityType: 1,
          evidences: ["base64", "base64"],
        },
      ],
      tableHeader: [
        { title: "GRAU", width: 10 },
        { title: "TÍTULO", width: 25 },
        { title: "TIPO", width: 20 },
        { title: "EVIDÊNCIA", width: 25 },
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
    searchVulnerabilities() {
      console.log(
        "Buscando vulnerabilidades: ",
        this.vulnerabilityTitle,
        this.criticalityLevel.value,
        this.vulnerabilityType.value
      );
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

.header {
  color: $primaryColor;
}

#home-page {
  padding: 0 30px;
}

.title-line {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
