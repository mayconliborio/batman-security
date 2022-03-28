<template>
  <v-col :cols="cols">
    <div class="label-box">
      <label>{{ label }}</label>
    </div>
    <div class="container-input">
      <v-textarea
        :rows="rows || 4"
        :no-resize="true"
        :disabled="disabled"
        :class="{
          'has-rules': rules,
          borderSuccess: borderSuccess,
          borderDanger: borderDanger,
        }"
        :rules="rules ? rules : []"
        v-model="text"
        :placeholder="placeholder"
        class="text-field"
        @input="$emit('update', text)"
        @keyup.enter="$emit('onEnter', text)"
        outlined
        :height="heigth"
      >
      </v-textarea>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "TextAreaField",
  props: {
    label: String,
    placeholder: String,
    cols: Number,
    rules: String,
    valueField: String,
    disabled: Boolean,
    borderSuccess: String,
    borderDanger: String,
    heigth: String,
    rows: Number,
  },
  data() {
    return {
      text: "",
    };
  },
  watch: {
    valueField() {
      this.text = this.valueField;
      this.$emit("update", this.text);
    },
  },
  mounted() {
    if (this.valueField) {
      this.text = this.valueField;
      this.$emit("update", this.text);
    }
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

.v-input ::v-deep textarea {
  color: $primaryColor !important;
  font-family: "Roboto Black", sans-serif;
  font-size: 18px;
}
.v-input ::v-deep textarea {
  color: $primaryColor !important;
  caret-color: $primaryColor !important;
  font-family: "Roboto Black", sans-serif !important;
}
</style>
