<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          :cols="6"
          placeholder="Vulnerabilidade 1..."
          label="Título"
          @update="title = $event"
        />
        <TextField
          :cols="6"
          placeholder="Afeta a segurança..."
          @update="comment = $event"
          label="Descrição"
        />
      </v-row>

      <v-row>
        <SelectField
          :col="6"
          @update="type = $event"
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
          @update="evidences = $event"
          label="Evidências"
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
          @click="goToHomePage()"
        />
        <DefaultButton
          icon="fas fa-plus"
          text="Cadastrar Vulnerabilidade"
          isForm
          width="280"
          @click="createVulnerability(updatedValues)"
        />
        <MessageModal
          v-if="messageModalController.show"
          :title="messageModalController.title"
          :header="messageModalController.header"
          :messages="messageModalController.messages"
          @confirm="action_resetMessageModalController()"
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
import GlobalMethods from "../../mixins/GlobalMethods";
import TextAreaField from "../fields/TextAreaField";
import MultiImagesUploadField from "../fields/MultiImagesUploadField";
import MessageModal from "../modal/MessageModal";
import { mapState, mapActions } from "vuex";

export default {
  name: "CreationForm",
  components: {
    MessageModal,
    MultiImagesUploadField,
    TextAreaField,
    DefaultButton,
    TextField,
    SelectField,
  },
  mixins: [GlobalData, GlobalMethods],
  data() {
    return {
      title: "",
      comment: "",
      type: "",
      criticalityLevel: {},
      evidences: [],
      solutionProposal: "",
    };
  },
  methods: {
    ...mapActions([
      "action_changeMessageSnackBar",
      "action_createVulnerability",
      "action_setMessageModalController",
      "action_resetMessageModalController",
    ]),
    createVulnerability() {
      let validate = this.checkValidity();

      if (validate.isValid) {
        this.action_createVulnerability(this.updatedValues);
        this.action_changeMessageSnackBar({
          message: "Vulnerabilidade cadastrada com sucesso!",
          sucess: true,
        });
        this.goToHomePage();
      } else {
        this.action_setMessageModalController(validate.messageModalController);
      }
    },
    checkValidity() {
      let validate = {
        isValid: true,
        messageModalController: {
          header: "Cadastro de Vulnerabilidade",
          title: "Atenção, os seguintes campos são obrigatórios:",
          messages: [],
        },
      };
      let messages = [];

      if (!this.title) {
        messages.push("Título");
        validate.isValid = false;
      }
      if (!this.comment) {
        messages.push("Descrição");
        validate.isValid = false;
      }
      if (this.criticalityLevel.value === 0) {
        messages.push("Grau de Criticidade");
        validate.isValid = false;
      }
      if (this.type.value === 0) {
        messages.push("Tipo de Vulnerabilidade");
        validate.isValid = false;
      }
      if (this.type.value === 2 && !this.evidences.length) {
        messages.push("Evidencias (Quando tipo = SAST)");
        validate.isValid = false;
      }
      if (!this.solutionProposal) {
        messages.push("Solução Proposta");
        validate.isValid = false;
      }
      validate.messageModalController.messages = messages;
      return validate;
    },
  },
  computed: {
    ...mapState({
      screenSize: (state) => state.screenSize,
      id: (state) => state.vulnerabilitiesIndex,
      messageModalController: (state) => state.messageModalController,
    }),
    updatedValues() {
      return {
        id: this.id,
        title: this.title,
        comment: this.comment,
        type: this.type.value,
        criticalityLevel: this.criticalityLevel.value,
        evidences: this.evidences || [],
        solutionProposal: this.solutionProposal,
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
