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
        :data-cy="label + '-field'"
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
        <span v-if="!uploadedImages.length">
          Arraste e solte aqui o(s) arquivo(s)
          <span class="text-primary">.png</span> ou
          <span class="text-primary">.jpg</span><br />ou clique aqui para
          selecionar do seu computador!
          <br />
        </span>
        <span v-else>
          <span class="count"
            >{{ uploadedImages.length }} Arquivo(s) selecionado(s)... <br
          /></span>
          <span>
            Clique aqui para alterar o(s) arquivo(s) selecionado(s)!
          </span>
        </span>
      </p>
    </div>
    <BatPreviewBox
      editable
      @removeImage="removeImage($event)"
      :images="uploadedImages"
    />
  </v-col>
</template>

<script>
import BatPreviewBox from "../others/BatPreviewBox";
import { mapActions } from "vuex";

export default {
  name: "MultiImagesUploadField",
  components: { BatPreviewBox },
  props: {
    label: String,
    cols: Number,
    height: Number,
    images: Array,
  },
  data() {
    return {
      uploadedImages: [],
      uploadFieldName: "images",
      preLoad: true,
    };
  },
  watch: {
    images(newValue) {
      if (this.preLoad === true && newValue?.length > 0) {
        let images = [];
        for (let i = 0; i < this.images.length; i++) {
          let image = this.images[i].toString();
          images.push(image);
        }
        this.uploadedImages = images || [];
        this.$emit("update", images);
        this.preLoad = false;
      }
    },
  },
  methods: {
    ...mapActions(["action_changeMessageSnackBar"]),
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    reset() {
      this.uploadedImages = [];
    },
    filesChange() {
      this.reset();
      let files = this.$refs.file.files;
      let validExtensions = ["image/jpg", "image/png", "image/jpeg"];
      let isValid = false;

      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (validExtensions.includes(file.type)) {
          isValid = true;
        }
      }
      if (isValid) {
        this.listImages(files);
      } else if (files.length > 0) {
        this.action_changeMessageSnackBar({
          message: "Arquivo(s) inválidos!",
          sucess: false,
        });
      } else {
        this.action_changeMessageSnackBar({
          message: "Nenhum arquivo selecionado!",
          sucess: false,
        });
      }
    },
    listImages(images) {
      for (let i = 0; i < images.length; i++) {
        this.toBase64(images[i]).then((data) => {
          this.uploadedImages.push(data);
        });
      }
      this.$emit("update", this.uploadedImages);
    },
    toBase64(image) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
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

#multi-image-upload {
  margin-bottom: 8px;
}

img {
  padding: 6px !important;
}

.drop-box {
  outline: 1px dashed $textColor;
  background: $secondaryColor;
  color: $textColor;
  margin: 0 1px;
  border-radius: 10px;
  position: relative;
}

.input-file {
  opacity: 0;
  width: 100%;
  cursor: pointer;
  position: absolute;
}

.drop-box:hover {
  background: $blackColor;
}

.drop-box p {
  font-size: 1.2em;
  text-align: center;
  margin: 0;
}

.count {
  margin-top: 10px;
  color: $primaryColor;
}

.fa-paperclip {
  font-size: 40px;
  padding-top: 10px;
  transform: rotate(-45deg);
  margin-bottom: 20px;
}
</style>
