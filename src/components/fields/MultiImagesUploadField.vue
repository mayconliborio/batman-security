<template>
  <v-col :cols="cols" id="multi-image-upload">
    <div class="label-box">
      <label>{{ label }}</label>
    </div>
    <div
      class="drop-box is-clickable flex-justify-center"
      :style="'height: ' + height + 'px'"
    >
      <input
        type="file"
        multiple
        :name="uploadFieldName"
        @change="filesChange()"
        ref="file"
        accept=".jpg, .png"
        class="input-file"
        :style="'height: ' + height + 'px'"
      />
      <p v-if="true">
        <i class="fas fa-paperclip text-primary"></i><br />
        <span v-if="!fileCount">
          Arraste e solte aqui arquivos
          <span class="text-primary">.png</span> ou
          <span class="text-primary">.jpg</span><br />ou clique aqui para
          selecionar os arquivos do seu computador
          <br />
        </span>
        <span v-else>
          <span class="selected-images"
            >{{ fileCount }} Arquivos selecionados... <br
          /></span>
          <span> Clique aqui para alterar os arquivos selecionados! </span>
        </span>
      </p>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "MultiImagesUploadField",
  props: {
    label: String,
    cols: Number,
    height: Number,
  },
  data() {
    return {
      uploadedImages: [],
      uploadError: null,
      uploadFieldName: "images",
      fileCount: 0,
    };
  },
  methods: {
    reset() {
      this.uploadedImages = [];
      this.uploadError = null;
    },
    filesChange() {
      this.uploadedImages = this.$refs.file.files;
      this.fileCount = this.$refs.file.files.length;
      this.$emit("update", this.uploadedImages);
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style scoped lang="scss">
label {
  color: $textColor !important;
  font-family: "Roboto", sans-serif;
  font-size: 14px !important;
}

#multi-image-upload {
  margin-bottom: 8px;
}

.label-box {
  margin-bottom: 5px;
  margin-top: 4px;
}

.drop-box {
  outline: 1px dashed $textColor; /* the dash box */
  background: $secondaryColor;
  color: $textColor;
  margin: 0 1px;
  border-radius: 10px;
  position: relative;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  cursor: pointer;
  position: absolute;
}

.drop-box:hover {
  background: $blackColor; /* when mouse over to the drop zone, change color */
}

.text-primary {
  color: $primaryColor;
}

.drop-box p {
  font-size: 1.2em;
  text-align: center;
  margin: 0;
}

.selected-images {
  margin-top: 10px;
  color: $primaryColor;
}

i {
  font-size: 40px;
  padding-top: 10px;
  transform: rotate(-45deg);
  margin-bottom: 20px;
}
</style>
