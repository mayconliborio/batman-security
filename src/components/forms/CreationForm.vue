<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          :cols="6"
          placeholder="Vulnerabilidade 1..."
          @update="vulnerabilityTitle = $event"
          label="Título"
        />
        <TextField
          :cols="6"
          placeholder="Afeta a segurança..."
          @update="vulnerabilityTitle = $event"
          label="Comentário"
        />
      </v-row>

      <v-row>
        <SelectField
          :col="6"
          @update="vulnerabilityType = $event"
          :items="vulnerabilityTypeList"
          label="Tipo de Vulnerabilidade"
        />
        <SelectField
          :col="6"
          :items="criticalityLevelList"
          @update="criticalityLevel = $event"
          label="Grau de Criticidade"
        />
      </v-row>
      <v-row>
        <MultiImagesUploadField
          :height="screenSize.heigth > 847 ? 250 : 200"
          label="Evidências"
          @update="evidences = $event"
        />
      </v-row>
      <v-row>
        <TextAreaField
          label="Solução Proposta"
          :rows="screenSize.heigth > 847 ? 5 : 4"
          @update="solutionProposal = $event"
        />
      </v-row>
      <v-row class="w-100 flex-justify-around">
        <DefaultButton
          icon="fas fa-arrow-left"
          text="Voltar"
          secondaryButton
          width="280"
          isForm
          @click="
            $router.push({
              name: 'HomePage',
            })
          "
        />
        <DefaultButton
          icon="fas fa-plus"
          text="Cadastrar Vulnerabilidade"
          isForm
          width="280"
          @click="createVulnerability(updatedValues)"
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
import TextAreaField from "../fields/TextAreaField";
import MultiImagesUploadField from "../fields/MultiImagesUploadField";
import { mapState, mapActions } from "vuex";

export default {
  name: "CreationForm",
  components: {
    MultiImagesUploadField,
    TextAreaField,
    DefaultButton,
    TextField,
    SelectField,
  },
  mixins: [GlobalData],
  data() {
    return {
      vulnerabilityTitle: String,
      vulnerabilityType: {},
      criticalityLevel: {},
      evidences: {},
      solutionProposal: String,
    };
  },
  methods: {
    ...mapActions(["action_changeMessageSnackBar"]),
    createVulnerability() {
      //validar campos obrigatórios
      console.log("Cadastrando vulnerabilidade...");
    },
  },
  computed: {
    ...mapState({
      screenSize: (state) => state.screenSize,
      id: (state) => state.vulnerabilitiesIndex,
    }),
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
