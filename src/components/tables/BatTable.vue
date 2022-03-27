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
    <div v-for="item in items" :key="item.id" class="table-rows">
      <VulnerabilityRow
        :item="modifiedItem(item)"
        @showClick="showVulnerability($event)"
        @editClick="editVulnerability($event)"
        @deleteClick="deleteVulnerabilityModalControler($event)"
      />
    </div>
  </div>
</template>

<script>
import VulnerabilityRow from "../rows/VulnerabilityRow";
import ConfirmationModal from "../modal/ConfirmationModal";
import GlobalData from "../../mixins/GlobalData";
import GlobalMethods from "../../mixins/GlobalMethods";
import { mapState, mapActions } from "vuex";

export default {
  name: "BatTable",
  mixins: [GlobalData, GlobalMethods],
  data() {
    return {
      activeVulnerability: {},
    };
  },
  components: { ConfirmationModal, VulnerabilityRow },
  props: {
    header: {},
    items: {},
  },
  methods: {
    ...mapActions([
      "action_setModalControler",
      "action_resetModalControler",
      "action_changeMessageSnackBar",
    ]),
    modifiedItem(item) {
      let modifiedItem = { ...item };

      modifiedItem.criticalityLevel = {
        value: item.criticalityLevel,
        name: this.getCriticalityLevelName(item.criticalityLevel),
      };
      modifiedItem.vulnerabilityType = {
        value: item.vulnerabilityType,
        name: this.getVulnerabilityTypeName(item.vulnerabilityType),
      };
      return { ...modifiedItem, edit: "fas fa-pen", delete: "fas fa-trash" };
    },
    showVulnerability(item) {
      if (this.otherButton) {
        this.otherButton = !this.otherButton;
        return;
      }
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
      this.action_changeMessageSnackBar({
        message: "Vulnerabilidade excluida com sucesso!",
        sucess: true,
      });
      this.action_resetModalControler();
      console.log(item);
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
    }),
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

.table-rows,
.table-header {
  padding-left: 6px;
}
</style>
