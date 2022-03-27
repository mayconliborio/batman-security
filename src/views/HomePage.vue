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
              name: 'VulnerabilityRegistration',
            })
          "
          icon="fas fa-plus"
          text="Cadastrar Vulnerabilidade"
        />
      </div>
      <SearchForm @searchVulnerabilities="searchVulnerabilities($event)" />
    </div>
    <div id="tabela">
      <BatTable :header="tableHeader" :items="vulnerabilities" />
    </div>
  </div>
</template>

<script>
import DefaultButton from "../components/buttons/DefaultButton.vue";
import BatTable from "../components/tables/BatTable";
import SearchForm from "../components/forms/SearchForm";
import { mapState } from "vuex";

export default {
  name: "HomePage",
  components: { SearchForm, DefaultButton, BatTable },
  data() {
    return {
      screenSize: {
        width: document.documentElement.clientWidth,
        heigth: document.documentElement.clientHeight,
      },
      tableHeader: [
        { title: "GRAU", width: 10 },
        { title: "TÍTULO", width: 25 },
        { title: "TIPO", width: 20 },
        { title: "EVIDÊNCIA", width: 25 },
      ],
    };
  },
  methods: {
    searchVulnerabilities(searchData) {
      console.log(
        "Buscando vulnerabilidades: ",
        searchData.vulnerabilityTitle,
        searchData.criticalityLevel.value,
        searchData.vulnerabilityType.value
      );
    },
  },
  computed: {
    ...mapState({
      vulnerabilities: (state) => state.vulnerabilities,
    }),
  },
};
</script>

<style scoped lang="scss">
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
