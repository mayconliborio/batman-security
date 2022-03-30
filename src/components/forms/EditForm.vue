<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          :cols="6"
          placeholder="Vulnerabilidade 1..."
          label="Título"
          :valueField="vulnerability.title"
          @update="vulnerability.title = $event"
        />
        <TextField
          :cols="6"
          placeholder="Afeta a segurança..."
          label="Descrição"
          :valueField="vulnerability.comment"
          @update="vulnerability.comment = $event"
        />
      </v-row>

      <v-row>
        <SelectField
          :col="6"
          :items="vulnerabilityTypeList"
          label="Tipo de Vulnerabilidade"
          key-name="name"
          key-value="value"
          :valueField="{ value: activeVulnerability.type }"
          @update="vulnerability.type = $event"
        />
        <SelectField
          :col="6"
          :items="criticalityLevelList"
          label="Grau de Criticidade"
          key-name="name"
          key-value="value"
          @update="vulnerability.criticalityLevel = $event"
          :valueField="{ value: activeVulnerability.criticalityLevel }"
        />
      </v-row>
      <v-row>
        <MultiImagesUploadField
          :height="screenSize.heigth > 847 ? 250 : 200"
          label="Evidências"
          :images="vulnerability.evidences || []"
          @update="vulnerability.evidences = $event"
        />
      </v-row>
      <v-row>
        <TextAreaField
          label="Solução Proposta"
          :rows="screenSize.heigth > 847 ? 5 : 4"
          :valueField="vulnerability.solutionProposal"
          @update="vulnerability.solutionProposal = $event"
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
            backAction = true;
            backToHomePage();
          "
        />
        <DefaultButton
          icon="fas fa-pen"
          text="Editar Vulnerabilidade"
          width="280"
          isForm
          @click="
            backAction = false;
            saveEditedVulnerability();
          "
        />
        <ConfirmationModal
          v-if="modalController.show"
          :header="modalController.header"
          :messages="modalController.messages"
          @cancel="action_resetModalController()"
          @confirm="manageContentModal()"
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
import TextAreaField from "../fields/TextAreaField";
import MultiImagesUploadField from "../fields/MultiImagesUploadField";
import { mapActions, mapState } from "vuex";
import ConfirmationModal from "../modal/ConfirmationModal";
import GlobalMethods from "../../mixins/GlobalMethods";
import MessageModal from "@/components/modal/MessageModal";

export default {
  name: "EditForm",
  components: {
    MessageModal,
    ConfirmationModal,
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
      type: 0,
      criticalityLevel: 0,
      evidences: [],
      solutionProposal: "",
      backAction: false,
      vulnerability: {},
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.action_setActiveVulnerability(parseInt(id));
    this.vulnerability = { ...this.activeVulnerability };
  },
  methods: {
    ...mapActions([
      "action_setModalController",
      "action_resetModalController",
      "action_setMessageModalController",
      "action_resetMessageModalController",
      "action_changeMessageSnackBar",
      "action_setActiveVulnerability",
      "action_updateVulnerability",
    ]),
    saveEditedVulnerability() {
      if (this.isDifferent()) {
        let validate = this.checkValidity();

        if (validate.isValid) {
          let newModalController = {
            header: "Edição de Vulnerabilidade",
            messages: ["Tem certeza que deseja alterar o registro? "],
          };
          this.action_setModalController(newModalController);
        } else {
          this.action_setMessageModalController(
            validate.messageModalController
          );
        }
      } else {
        this.action_changeMessageSnackBar({
          message: "Nenhum dado foi alterado!",
          sucess: false,
        });
        this.goToHomePage();
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

      if (!this.vulnerability.title) {
        messages.push("Título");
        validate.isValid = false;
      }
      if (!this.vulnerability.comment) {
        messages.push("Descrição");
        validate.isValid = false;
      }

      if (this.vulnerability.criticalityLevel.value === 0) {
        messages.push("Grau de Criticidade");
        validate.isValid = false;
      }
      if (this.vulnerability.type.value === 0) {
        messages.push("Tipo de Vulnerabilidade");
        validate.isValid = false;
      }
      if (this.vulnerability.type.value === 2 && !this.evidences.length) {
        messages.push("Evidencias (Quando tipo = SAST)");
        validate.isValid = false;
      }
      if (!this.vulnerability.solutionProposal) {
        messages.push("Solução Proposta");
        validate.isValid = false;
      }
      validate.messageModalController.messages = messages;
      return validate;
    },
    backToHomePage() {
      if (this.isDifferent()) {
        let newModalController = {
          header: "Edição de Vulnerabilidade",
          messages: [
            "Você está saindo da edição sem salvar os dados.",
            "Deseja continuar?",
          ],
        };
        this.action_setModalController(newModalController);
      } else {
        this.action_resetModalController();
        this.goToHomePage();
      }
    },
    manageContentModal() {
      if (this.backAction) {
        this.action_resetModalController();
        this.goToHomePage();
      } else {
        this.action_updateVulnerability(this.updatedVulnerability);
        this.action_changeMessageSnackBar({
          message: "Vulnerabilidade alterada com sucesso!",
          sucess: true,
        });
        this.action_resetModalController();
        this.goToHomePage();
      }
    },
    isDifferent() {
      let oldData = this.activeVulnerability,
        newData = this.updatedVulnerability;
      let isDiff = false;
      Object.keys(oldData).forEach((name) => {
        if (name === "evidences") {
          if (oldData.evidences.length === newData.evidences.length) {
            for (let i = 0; i < oldData.evidences.length; i++) {
              if (oldData.evidences[i] !== newData.evidences[i]) {
                isDiff = true;
                return true;
              }
            }
          } else {
            isDiff = true;
            return true;
          }
        } else if (oldData[name] !== newData[name]) {
          isDiff = true;
          return true;
        }
      });
      return isDiff;
    },
  },
  computed: {
    ...mapState({
      screenSize: (state) => state.screenSize,
      modalController: (state) => state.modalController,
      activeVulnerability: (state) => state.activeVulnerability,
      messageModalController: (state) => state.messageModalController,
    }),
    updatedVulnerability() {
      return {
        id: this.vulnerability.id,
        title: this.vulnerability.title,
        comment: this.vulnerability.comment,
        type: this.vulnerability.type.value || this.vulnerability.type,
        criticalityLevel:
          this.vulnerability.criticalityLevel.value ||
          this.vulnerability.criticalityLevel,
        solutionProposal: this.vulnerability.solutionProposal,
        evidences: this.vulnerability.evidences || [],
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
