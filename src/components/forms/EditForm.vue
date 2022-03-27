<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          :cols="6"
          placeholder="Vulnerabilidade 1..."
          @update="vulnerabilityTitle = $event"
          :valueField="vulnerability.title"
          label="Título"
        />
        <TextField
          :cols="6"
          placeholder="Afeta a segurança..."
          @update="vulnerabilityComment = $event"
          :valueField="vulnerability.comment"
          label="Comentário"
        />
      </v-row>

      <v-row>
        <SelectField
          :col="6"
          @update="vulnerabilityType = $event"
          :valueField="{ value: vulnerability.vulnerabilityType }"
          :items="vulnerabilityTypeList"
          label="Tipo de Vulnerabilidade"
        />
        <SelectField
          :col="6"
          :items="criticalityLevelList"
          :valueField="{ value: vulnerability.criticalityLevel }"
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
          :valueField="vulnerability.solutionProposal"
          @update="solutionProposal = $event"
        />
      </v-row>
      <v-row class="w-100 flex-justify-center">
        <DefaultButton
          icon="fas fa-pen"
          text="Editar Vulnerabilidade"
          isForm
          @click="saveEditedVulnerability(updatedValues)"
        />
        <ConfirmationModal
          v-if="modalControler.show"
          :header="modalControler.header"
          :messages="modalControler.messages"
          @cancel="action_resetModalControler()"
          @confirm="deleteVulnerability(activeVulnerability.id)"
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
import { mapActions, mapState } from "vuex";
import ConfirmationModal from "../modal/ConfirmationModal";

export default {
  name: "EditForm",
  components: {
    ConfirmationModal,
    MultiImagesUploadField,
    TextAreaField,
    DefaultButton,
    TextField,
    SelectField,
  },
  mixins: [GlobalData],
  data() {
    return {
      vulnerability: {},
      vulnerabilityTitle: String,
      vulnerabilityComment: String,
      vulnerabilityType: {},
      criticalityLevel: {},
      evidences: {},
      solutionProposal: String,
    };
  },
  methods: {
    ...mapActions([
      "action_setModalControler",
      "action_resetModalControler",
      "action_changeMessageSnackBar",
    ]),
    saveEditedVulnerability() {
      console.log("Cadastrando vulnerabilidade...");
    },
    searchVulnerability(id) {
      console.log("Buscando Vulnerabilidade com id ", id);
    },
  },
  mounted() {
    this.vulnerability = {
      id: 1,
      title: "Vulnerabilidade 1",
      criticalityLevel: 3,
      vulnerabilityType: 3,
      evidences: ["base64", "base64"],
      comment: "Isso e aquilo",
      solutionProposal: "Lorem Ipsum",
    };
    this.searchVulnerability(this.$route.params.id);
  },
  computed: {
    ...mapState({
      screenSize: (state) => state.screenSize,
      modalControler: (state) => state.modalControler,
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
