<template>
  <div class="preview-label">
    <div class="label-box">
      <label>Prévida das Imagens:</label>
    </div>
    <div class="preview-box flex-justify-center">
      <div id="preview" class="w-100 flex-justify-center">
        <div
          class="w-100 flex-justify-center"
          v-if="images && images.length > 0"
        >
          <BatImages
            @removeImage="$emit('removeImage', $event)"
            :images="images"
            :editable="editable"
          />
        </div>
        <div v-else>
          <span class="text-primary">Nenhuma imagem selecionada!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BatImages from "./BatImages";
export default {
  name: "BatPreviewBox",
  components: { BatImages },
  props: {
    images: Array,
    editable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.preview-label {
  margin-top: 12px;
}

.preview-box {
  max-height: 500px;
  min-height: 100px;
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
</style>
