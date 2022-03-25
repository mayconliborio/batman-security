<template>
  <v-col
    style="margin: 0 !important; padding: 0 6px !important"
    class="container-input"
    :cols="cols"
  >
    <div class="label-box">
      <label>{{ label }}</label>
    </div>
    <div class="container-input">
      <v-select
        :disabled="disabled"
        :item-text="keyName ? keyName : 'name'"
        :item-value="keyValue ? keyValue : 'value'"
        v-model="select"
        :items="items"
        :class="[rules ? 'has-rules' : '', hint ? 'hint' : 'no-hint']"
        :rules="rules ? rules : []"
        class="text-field"
        :hint="hint ? hintLenged : ''"
        :persistent-hint="!!hint"
        item-color="32383D"
        @input="$emit('update:value', select)"
        @keyup.enter="$emit('onEnter', select)"
        @change="$emit('updateEvent', select)"
        return-object
        outlined
      >
      </v-select>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "SelectField",
  props: [
    "dataCy",
    "label",
    "placeholder",
    "type",
    "cols",
    "prependInnerIcon",
    "rules",
    "items",
    "keyName",
    "keyValue",
    "disabled",
    "valueField",
    "hint",
    "helpText",
    "secondaryKeyName",
    "secondaryKeyValue",
    "secondaryLabel",
  ],
  data() {
    return {
      select: {},
      keyField: 0,
    };
  },
  mounted() {
    if (!this.valueField && this.items.length > 0) {
      this.select = this.items[0];
    } else {
      this.select = this.valueField;
    }
    if (!this.rules) {
      this.$emit("update:value", this.select);
    }
    this.keyField++;
  },
  watch: {
    valueField() {
      this.select = this.valueField;
      this.$emit("update:value", this.select);
    },
  },
  computed: {
    hintLenged() {
      if (this.hint) {
        let string = "";
        this.hint.forEach((legend, index) => {
          string += index % 2 ? ` ${this.select[legend]} | ` : legend;
        });
        return string;
      }
      return "";
    },
  },
};
</script>

<style scoped lang="scss">
.container-input {
  display: flex;
  flex-direction: column;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

label {
  color: $textColor !important;
  font-family: "Roboto", sans-serif;
  font-size: 14px !important;
}

.label-box {
  margin-bottom: 5px;
}

.v-input ::v-deep input {
  color: $primaryColor !important;
  font-family: "Roboto-Bold", sans-serif;
  font-size: 18px;
}

.v-input ::v-deep fieldset {
  color: transparent !important;
}

.v-input ::v-deep .v-input__slot {
  background: transparent !important;
  border-radius: 10px;
  border: 1px solid $textColor !important;
  height: 50px !important;
  min-height: 50px !important;
  max-height: 50px !important;
}

.v-input ::v-deep .v-text-field__details {
  display: none;
}

.v-input.no-hint ::v-deep .v-text-field__details {
  display: none;
}

.v-input.error--text ::v-deep .v-text-field__details {
  display: block;
}

.v-input.hint > .v-messages__message {
  color: var(--blackColor);
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}

.v-input ::v-deep .v-messages__message {
  color: $redColor;
  font-family: "Roboto-Bold", sans-serif;
}

.v-input.error--text ::v-deep .v-input__slot {
  border: solid $redColor 1px !important;
}

.v-input.borderSuccess ::v-deep .v-input__slot {
  border: solid $greenColor 2px !important;
}

.v-input.borderDanger ::v-deep .v-input__slot {
  border: solid $greenColor 2px !important;
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

//Cor do selecionado
.v-input ::v-deep .v-select__selection {
  color: $primaryColor !important;
  font-family: "Roboto Black", sans-serif;
  font-size: 18px;
}

::v-deep .v-list-item__title {
  color: $primaryColor;
}

.theme--light.v-list {
  background: $secondaryColor;
}

.v-list-item__content {
  color: white !important;
}

::v-deep .v-menu__content {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}

::v-deep .v-application .primary--text {
  color: $backgroundColor !important;
}
</style>
