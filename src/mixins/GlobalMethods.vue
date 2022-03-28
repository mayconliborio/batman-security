<script>
export default {
  methods: {
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
    getVulnerabilityTypeName(vulnerabilityType) {
      switch (vulnerabilityType) {
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
    goToHomePage() {
      this.$router.push({
        name: "HomePage",
      });
    },
  },
};
</script>
