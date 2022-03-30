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
      v-if="modalController.show"
      :header="modalController.header"
      :messages="modalController.messages"
      @cancel="action_resetModalController()"
      @confirm="deleteVulnerability(activeVulnerability.id)"
    />
    <div class="table-rows w-100 flex-column-center">
      <div
        v-for="(vulnerability, index) in filteredLocal"
        class="w-100"
        :key="vulnerability.id + Math.random().toString(16).slice(2)"
      >
        <VulnerabilityRow
          :index="index"
          :vulnerability="modifiedItem(vulnerability)"
          @showClick="showVulnerability($event)"
          @editClick="editVulnerability($event)"
          @deleteClick="deleteVulnerabilityModalController($event)"
        />
      </div>
      <div class="pagination-box flex-justify-center" v-if="pagination.active">
        <div class="flex-justify-between w-100">
          <span
            @click="previousPage"
            data-cy="PreviousPage-button"
            class="pagination-circle is-clickable flex-justify-center"
            :class="{ disabled: pagination.page === 1 }"
            ><i class="fas fa-angle-left"></i
          ></span>
          <span
            @click="nextPage"
            class="pagination-circle flex-justify-center"
            :class="{ disabled: pagination.page === pagination.pages }"
          >
            {{ pagination.page }}
          </span>
          <span
            data-cy="NextPage-button"
            class="pagination-circle flex-justify-center"
            :class="{ disabled: pagination.page === pagination.pages }"
            @click="nextPage"
            ><i class="fas fa-angle-right"></i
          ></span>
        </div>
      </div>
      <span class="text-primary table-content" v-if="!filteredLocal.length">
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
      pagination: {
        active: false,
        page: 1,
        perPage: 6,
        pages: 0,
        total: 0,
      },
      localList: {},
    };
  },
  components: { ConfirmationModal, VulnerabilityRow },
  props: {
    items: {},
  },
  methods: {
    ...mapActions([
      "action_setModalController",
      "action_resetModalController",
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
    },
    editVulnerability(item) {
      this.otherButton = true;
      this.$router.push({ path: `/editar-vulnerabilidade/${item.id}` });
    },
    deleteVulnerability(item) {
      this.otherButton = true;
      this.action_deleteVulnerability(item);
      this.action_changeMessageSnackBar({
        message: "Vulnerabilidade excluida com sucesso!",
        sucess: true,
      });
      this.action_resetModalController();
    },
    deleteVulnerabilityModalController(item) {
      this.otherButton = true;
      let newModalController = {
        header: "Excluir Vulnerabilidade",
        messages: [
          `Você está prestes a excluir a vulnerabilidade ${item.title}.`,
          "Deseja continuar?",
        ],
        show: true,
      };
      this.action_setModalController(newModalController);
      this.activeVulnerability = item;
    },
    previousPage() {
      if (this.pagination.page > 1) {
        this.pagination.page--;
      }
    },
    nextPage() {
      if (this.pagination.page < this.pagination.pages) {
        this.pagination.page++;
      }
    },
    resetPagination() {
      this.pagination = {
        active: false,
        page: 0,
      };
    },
  },
  computed: {
    ...mapState({
      modalController: (state) => state.modalController,
      vulnerabilities: (state) => state.vulnerabilities,
    }),
    ...mapGetters(["getFilteredVulnerabilities"]),
    pagesNumber() {
      return Math.floor(this.getFilteredVulnerabilities.length / 6);
    },
    filteredLocal() {
      let get = this.getFilteredVulnerabilities;
      console.log(get);
      let page = this.pagination.page,
        perPage = this.pagination.perPage;
      let inicio = perPage * page - perPage,
        fim = perPage * page;
      if (fim > this.pagination.total) {
        fim = this.getFilteredVulnerabilities.length;
      }
      return this.pagination.active
        ? this.getFilteredVulnerabilities.slice(inicio, fim)
        : this.getFilteredVulnerabilities;
    },
  },
  watch: {
    getFilteredVulnerabilities(newValue) {
      let length = newValue.length;

      let div = Math.floor(length / this.pagination.perPage);
      let mod = length % this.pagination.perPage;
      this.pagination.total = length - 1;
      this.pagination.active = length > this.pagination.perPage;
      this.pagination.pages = div + (mod === 0 ? 0 : 1);
      this.pagination.page =
        length > this.pagination.perPage ? this.pagination.page : 1;
    },
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

.pagination-circle {
  width: 30px;
  height: 25px;
  border-radius: 6px;
  background-color: $primaryColor;
  color: $blackColor;
  font-family: Roboto Black, sans-serif;
  font-size: 20px;
  font-weight: bold;
}

.pagination-box {
  width: 120px;
  margin-top: 20px;
  margin-bottom: 40px;
  user-select: none;
}

.disabled {
  pointer-events: none;
  background-color: $whitegroundOpacity;
}
</style>
