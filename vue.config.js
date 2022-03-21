module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "/src/assets/scss/variables.scss"; @import "/src/assets/scss/utils.scss";`,
      },
    },
  },
};
