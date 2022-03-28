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
          :valueField="{ value: selectedType }"
          @update="vulnerability.type = $event"
        />
        <SelectField
          :col="6"
          :items="criticalityLevelList"
          label="Grau de Criticidade"
          key-name="name"
          key-value="value"
          :valueField="{ value: selectedcriticalityLevel }"
          @update="vulnerability.criticalityLevel = $event"
        />
      </v-row>
      <v-row>
        <MultiImagesUploadField
          :height="screenSize.heigth > 847 ? 250 : 200"
          label="Evidências"
          :valueField="vulnerability.evidences"
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
          v-if="modalControler.show"
          :header="modalControler.header"
          :messages="modalControler.messages"
          @cancel="action_resetModalControler()"
          @confirm="manageContentModal()"
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
      selectedType: 0,
      selectedcriticalityLevel: 0,
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.action_setActiveVulnerability(parseInt(id));
    this.vulnerability = { ...this.activeVulnerability };
    this.selectedType = this.vulnerability.type;
    this.selectedcriticalityLevel = this.vulnerability.criticalityLevel;
  },
  methods: {
    ...mapActions([
      "action_setModalControler",
      "action_resetModalControler",
      "action_changeMessageSnackBar",
      "action_setActiveVulnerability",
      "action_updateVulnerability",
    ]),
    saveEditedVulnerability() {
      if (this.isDifferent()) {
        let newModalControler = {
          header: "Edição de Vulnerabilidade",
          messages: ["Tem certeza que deseja alterar o registro? "],
        };
        this.action_setModalControler(newModalControler);
      } else {
        this.action_changeMessageSnackBar({
          message: "Nenhum dado foi alterado!",
          sucess: false,
        });
        this.goToHomePage();
      }
    },
    backToHomePage() {
      if (this.isDifferent()) {
        let newModalControler = {
          header: "Edição de Vulnerabilidade",
          messages: [
            "Você está saindo da edição sem salvar os dados.",
            "Deseja continuar?",
          ],
        };
        this.action_setModalControler(newModalControler);
      } else {
        this.action_resetModalControler();
        this.goToHomePage();
      }
    },
    manageContentModal() {
      if (this.backAction) {
        this.action_resetModalControler();
        this.goToHomePage();
      } else {
        this.action_updateVulnerability(this.updatedVulnerability);
        this.action_changeMessageSnackBar({
          message: "Vulnerabilidade alterada com sucesso!",
          sucess: true,
        });
        this.action_resetModalControler();
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
      modalControler: (state) => state.modalControler,
      activeVulnerability: (state) => state.activeVulnerability,
    }),
    updatedVulnerability() {
      return {
        id: this.vulnerability.id,
        title: this.vulnerability.title,
        comment: this.vulnerability.comment,
        type: this.vulnerability.type.value,
        criticalityLevel: this.vulnerability.criticalityLevel.value,
        solutionProposal: this.vulnerability.solutionProposal,
        evidences: this.vulnerability.evidences,
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
