<template>
  <v-col :cols="cols">
    <div class="label-box">
      <label>{{ label }}</label>
    </div>
    <div class="container-input">
      <v-text-field
        :data-cy="label + '-field'"
        :append-icon="appendIcon"
        :disabled="disabled"
        :rules="rules ? rules : []"
        v-model="text"
        :type="type"
        :placeholder="placeholder"
        class="text-field"
        @keyup.enter="$emit('onEnter', text)"
        outlined
      >
      </v-text-field>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "TextField",
  props: {
    label: {},
    placeholder: {},
    type: {},
    cols: {},
    appendIcon: {},
    rules: {},
    valueField: {},
    disabled: {
      default: false,
    },
  },
  data() {
    return {
      text: this.valueField || "",
    };
  },
  watch: {
    valueField: {
      immediate: true,
      handler(newText, oldText) {
        if ((newText === "" || newText) && newText !== oldText) {
          this.text = newText;
        }
      },
    },
    text: {
      immediate: true,
      handler() {
        this.$emit("update", this.text);
      },
    },
  },
};
</script>

<style scoped lang="scss">
label {
  color: $textColor !important;
  font-family: "Roboto", sans-serif;
  font-size: 14px !important;
}

.label-box {
  margin-bottom: 4px;
  margin-top: 4px;
}

.v-input ::v-deep input {
  color: $primaryColor !important;
  font-family: "Roboto-Bold", sans-serif;
  font-size: 18px;
}

.v-input ::v-deep fieldset {
  color: transparent !important;
}

.v-input ::v-deep .v-text-field__details {
  display: none;
}

.v-input.error--text ::v-deep .v-text-field__details {
  display: block;
}

.v-input ::v-deep .v-messages__message {
  color: $redColor;
  font-family: "Roboto", sans-serif;
}

.v-input.error--text ::v-deep .v-input__slot {
  border: solid $redColor 1px !important;
}

.v-input ::v-deep .v-input__slot {
  background: transparent !important;
  border-radius: 10px;
  border: 1px solid $textColor !important;
  height: 50px !important;
  min-height: 50px !important;
  max-height: 50px !important;
}

.v-input.borderSuccess ::v-deep .v-input__slot {
  border: solid $sucessColor 2px !important;
}

.v-input.borderDanger ::v-deep .v-input__slot {
  border: solid $sucessColor 2px !important;
}

.v-input ::v-deep i {
  color: $primaryColor;
  font-size: 18px;
}

.v-input ::v-deep .v-input__append-inner {
  margin: 10px 5px 0 0;
}

.v-input ::v-deep input::placeholder {
  color: $grayColor !important;
  font-size: 14px;
  font-family: "Roboto", sans-serif !important;
}

.v-input ::v-deep input {
  color: $primaryColor !important;
  caret-color: $primaryColor !important;
  font-family: "Roboto Black", sans-serif !important;
}

.v-input ::v-deep input:focus {
  color: $primaryColor !important;
}

.v-input--is-focused ::v-deep i {
  color: $primaryColor !important;
}

.container-input {
  display: flex;
}

.theme--light.v-input.text-field input::placeholder {
  color: $placeholderColor;
}
</style>
