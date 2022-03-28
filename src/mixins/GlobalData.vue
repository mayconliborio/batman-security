<script>
export default {
  data() {
    return {
      criticalityLevelList: [
        {
          name: "Selecione",
          value: 0,
        },
        {
          name: "Low",
          value: 1,
        },
        {
          name: "Mid",
          value: 2,
        },
        {
          name: "High",
          value: 3,
        },
      ],
      vulnerabilityTypeList: [
        {
          name: "Selecione",
          value: 0,
        },
        {
          name: "DAST",
          value: 1,
        },
        {
          name: "SAST",
          value: 2,
        },
        {
          name: "NETWORK",
          value: 3,
        },
      ],
    };
  },
};
</script>
