<template>
  <div id="bat-table">
    <div class="table-header">
      <div class="celula flex-justify-start w-100">
        <h2
          v-for="(head, index) in header"
          :key="index"
          class="celula-text flex-column-center"
          :style="`width: ${head.width}%`"
        >
          {{ head.title }}
        </h2>
      </div>
    </div>
    <ConfirmationModal
      v-if="modalControler.show"
      :header="modalControler.header"
      :messages="modalControler.messages"
      @cancel="action_resetModalControler()"
      @confirm="deleteVulnerability(activeVulnerability.id)"
    />
    <div class="table-rows w-100 flex-column-center">
      <div
        v-for="vulnerability in getFilteredVulnerabilities"
        class="w-100"
        :key="vulnerability.id"
      >
        <VulnerabilityRow
          :vulnerability="modifiedItem(vulnerability)"
          @showClick="showVulnerability($event)"
          @editClick="editVulnerability($event)"
          @deleteClick="deleteVulnerabilityModalControler($event)"
        />
      </div>
      <span
        class="text-primary table-content"
        v-if="!getFilteredVulnerabilities.length"
      >
        Nenhuma vulnerabilidade encontrada!
      </span>
    </div>
  </div>
</template>

<script>
import VulnerabilityRow from "../rows/VulnerabilityRow";
import ConfirmationModal from "../modal/ConfirmationModal";
import GlobalData from "../../mixins/GlobalData";
import GlobalMethods from "../../mixins/GlobalMethods";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "BatTable",
  mixins: [GlobalData, GlobalMethods],
  data() {
    return {
      activeVulnerability: {},
      header: [
        { title: "GRAU", width: 10 },
        { title: "TÍTULO", width: 25 },
        { title: "TIPO", width: 20 },
        { title: "EVIDÊNCIA", width: 25 },
      ],
    };
  },
  components: { ConfirmationModal, VulnerabilityRow },
  props: {
    items: {},
  },
  methods: {
    ...mapActions([
      "action_setModalControler",
      "action_resetModalControler",
      "action_changeMessageSnackBar",
      "action_deleteVulnerability",
    ]),
    modifiedItem(vulnerability) {
      let vul = { ...vulnerability };

      vul.criticalityLevel = {
        value: vulnerability.criticalityLevel,
        name: this.getCriticalityLevelName(vulnerability.criticalityLevel),
      };
      vul.type = {
        value: vulnerability.type,
        name: this.getVulnerabilityTypeName(vulnerability.type),
      };
      return { ...vul, edit: "fas fa-pen", delete: "fas fa-trash" };
    },
    showVulnerability(item) {
      if (this.otherButton) {
        this.otherButton = !this.otherButton;
        return;
      }
      this.$router.push({
        name: "ShowVulnerability",
        params: { id: item.id },
      });
      console.log("Abrindo item: ", item);
    },
    editVulnerability(item) {
      this.otherButton = true;
      this.$router.push({
        name: "UpdateVulnerability",
        params: { id: item.id },
      });
    },
    deleteVulnerability(item) {
      this.otherButton = true;
      this.action_deleteVulnerability(item);
      this.action_changeMessageSnackBar({
        message: "Vulnerabilidade excluida com sucesso!",
        sucess: true,
      });
      this.action_resetModalControler();
    },
    deleteVulnerabilityModalControler(item) {
      this.otherButton = true;
      let newModalControler = {
        header: "Excluir Vulnerabilidade",
        messages: [
          `Você está prestes a excluir a vulnerabilidade ${item.title}.`,
          "Deseja continuar?",
        ],
        show: true,
      };
      this.action_setModalControler(newModalControler);
      this.activeVulnerability = item;
    },
  },
  computed: {
    ...mapState({
      modalControler: (state) => state.modalControler,
      vulnerabilities: (state) => state.vulnerabilities,
    }),
    ...mapGetters(["getFilteredVulnerabilities"]),
  },
};
</script>

<style scoped lang="scss">
h2 {
  font-size: 22px;
}

#bat-table {
  margin-top: 50px;
  color: $textColor;
}

.celula {
  padding: 0 40px 10px;
}

.table-content {
  font-size: 20px;
  margin-top: 50px;
}

.table-rows,
.table-header {
  padding-left: 6px;
}

.text-primary {
  color: $primaryColor;
}
</style>
