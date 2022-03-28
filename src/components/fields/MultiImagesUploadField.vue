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
          Arraste e solte aqui os arquivos
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
    <div class="preview-label" v-show="uploadedImages.length > 0">
      <div class="label-box">
        <label>Prévida das Imagens:</label>
      </div>
      <div class="preview-box flex-justify-center">
        <div id="preview" class="w-100 flex-justify-center">
          <img
            v-for="(image, index) in uploadedImages"
            :key="index"
            :src="image"
            alt=""
          />
        </div>
      </div>
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
    valueField: Array,
  },
  data() {
    return {
      uploadedImages: [],
      loadImages: 0,
      uploadError: null,
      uploadFieldName: "images",
      fileCount: 0,
    };
  },
  watch: {
    valueField: {
      immediate: true,
      handler(newText, oldText) {
        if ((newText === "" || newText) && newText !== oldText) {
          if (this.loadImages === 0) {
            this.uploadedImages = newText;
            this.loadImages++;
          }
        }
      },
    },
  },
  methods: {
    reset() {
      this.uploadedImages = [];
      this.uploadError = null;
    },
    filesChange() {
      this.reset();
      let files = this.$refs.file.files;
      this.fileCount = this.$refs.file.files.length;
      this.toBase64Images(files);
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    toBase64Images(images) {
      this.uploadedImages = [];
      for (let i = 0; i < images.length; i++) {
        this.toBase64(images[i]).then((data) => {
          this.uploadedImages.push(data);
        });
      }
      this.$emit("update", this.uploadedImages);
    },
    handleImages(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          continue;
        }

        const preview = document.getElementById("preview");
        const img = document.createElement("img");
        img.classList.add("img");
        img.file = file;
        img.style.margin = "20px";
        img.style.maxWidth = "700px";
        preview.appendChild(img);

        const reader = new FileReader();
        reader.onload = (function (aImg) {
          return function (e) {
            aImg.src = e.target.result;
          };
        })(img);
        reader.readAsDataURL(file);
      }
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

.preview-label {
  margin-top: 12px;
}
.preview-box {
  max-height: 500px;
  outline: 1px dashed $textColor;
  background: $secondaryColor;
  border-radius: 10px;
  overflow: auto;
  flex-wrap: wrap;
}

#preview {
  width: 100%;
  padding: 0 20px;
  flex-wrap: wrap;
}

img {
  padding: 6px !important;
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
