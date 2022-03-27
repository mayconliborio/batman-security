<template>
  <v-form class="w-100 flex-justify-start search-box">
    <v-container>
      <v-row>
        <TextField
          :cols="6"
          placeholder="Vulnerabilidade 1..."
          @update="vulnerabilityTitle = $event"
          :valueField="newVulnerability.title"
          label="Título"
        />
        <TextField
          :cols="6"
          placeholder="Afeta a segurança..."
          :valueField="newVulnerability.comment"
          @update="vulnerabilityComment = $event"
          label="Comentário"
        />
      </v-row>

      <v-row>
        <SelectField
          :col="6"
          :items="vulnerabilityTypeList"
          label="Tipo de Vulnerabilidade"
          :valueField="{ value: newVulnerability.type }"
          @update="vulnerabilityType = $event"
        />
        <SelectField
          :col="6"
          :items="criticalityLevelList"
          label="Grau de Criticidade"
          :valueField="{ value: newVulnerability.criticalityLevel, name: 'ho' }"
          @update="criticalityLevel = $event"
        />
      </v-row>
      <v-row>
        <MultiImagesUploadField
          :height="screenSize.heigth > 847 ? 250 : 200"
          label="Evidências"
          :valueField="newVulnerability.evidences"
          @update="evidences = $event"
        />
      </v-row>
      <v-row>
        <TextAreaField
          label="Solução Proposta"
          :rows="screenSize.heigth > 847 ? 5 : 4"
          :valueField="newVulnerability.solutionProposal"
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
import { mapActions, mapState, mapGetters } from "vuex";
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
  props: {
    vulnerability: {},
  },
  data() {
    return {
      newVulnerability: {},
      oldVulnerability: {},
      vulnerabilityTitle: "",
      vulnerabilityComment: "",
      vulnerabilityType: 0,
      criticalityLevel: 0,
      evidences: [],
      solutionProposal: "",
      backAction: false,
    };
  },
  mounted() {
    let id = this.$route.params;
    let vulnerability = this.getVulnerabilityById(id.id);
    this.oldVulnerability = JSON.parse(JSON.stringify(vulnerability));
    this.newVulnerability = JSON.parse(JSON.stringify(vulnerability));
  },
  methods: {
    ...mapActions([
      "action_setModalControler",
      "action_resetModalControler",
      "action_changeMessageSnackBar",
    ]),
    saveEditedVulnerability() {
      //validar campos obrigatórios
      //....
      if (this.isDifferent()) {
        console.log(true);
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
          show: true,
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
        console.log("ho OH");
      }
    },
    isDifferent() {
      let oldData = JSON.parse(JSON.stringify(this.oldVulnerability));
      let newData = JSON.parse(JSON.stringify(this.updatedVulnerability()));
      let isDiff = false;
      Object.keys(oldData).forEach((name) => {
        if (name === "evidences") {
          if (oldData.evidences.length === newData.evidences.length) {
            for (let i = 0; i < oldData.evidences.length; i++) {
              if (oldData.evidences[i] !== newData.evidences[i]) {
                console.log(
                  "Evidences: ",
                  oldData.evidences[i],
                  newData.evidences[i]
                );
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
    updatedVulnerability() {
      return {
        id: this.vulnerability.id,
        title: this.vulnerabilityTitle,
        comment: this.vulnerabilityComment,
        type: this.vulnerabilityType.value,
        criticalityLevel: this.criticalityLevel.value,
        solutionProposal: "Lorem Ipsum",
        evidences: [],
      };
    },
  },
  computed: {
    ...mapState({
      screenSize: (state) => state.screenSize,
      modalControler: (state) => state.modalControler,
    }),
    ...mapGetters({
      getVulnerabilityById: "getVulnerabilityById",
    }),
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
