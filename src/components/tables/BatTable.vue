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
    <div v-for="item in items" :key="item.id" class="table-rows">
      <VulnerabilityRow
        :item="modifiedItem(item)"
        @showClick="showVulnerability($event)"
        @editClick="editVulnerability($event)"
        @deleteClick="deleteVulnerability($event)"
      />
    </div>
  </div>
</template>

<script>
import VulnerabilityRow from "../rows/VulnerabilityRow";
export default {
  name: "BatTable",
  components: { VulnerabilityRow },
  props: {
    header: {},
    items: {},
  },
  methods: {
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
    getCriticalityLevelName(criticalityLevel) {
      switch (criticalityLevel) {
        case 1:
          return "Low";
        case 2:
          return "Mid";
        case 3:
          return "High";
        default:
          return "";
      }
    },
    getVulnerabilityTypeName(criticalityLevel) {
      switch (criticalityLevel) {
        case 1:
          return "DAST";
        case 2:
          return "SAST";
        case 3:
          return "NETWORK";
        default:
          return "";
      }
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
      console.log("Editando item: ", item);
    },
    deleteVulnerability(item) {
      this.otherButton = true;
      console.log("Deletando item: ", item);
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

.table-rows,
.table-header {
  padding-left: 6px;
}
</style>
