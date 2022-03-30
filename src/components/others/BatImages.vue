<template>
  <div class="flex-justify-start">
    <div class="expanded-box flex-justify-center" v-if="selectedImage.show">
      <div class="box">
        <div class="close-button text-primary flex-justify-end">
          <i
            data-cy="Diminuir-image"
            @click="closeExpandedImage(index)"
            class="fas fa-times is-clickable"
          />
        </div>
        <div class="background-image flex-justify-center">
          <img class="expanded-image" alt="" :src="selectedImage.src" />
        </div>
      </div>
    </div>
    <div
      class="flex-column-end images-box"
      v-for="(image, index) in images"
      :key="index"
    >
      <div class="remove-image flex-justify-end">
        <i
          :data-cy="'Remover-' + index + '-image'"
          title="Remover imagem"
          @click="removeImage(index)"
          v-if="editable"
          class="fas fa-times"
        />
      </div>
      <div class="flex-justify-center">
        <img
          :data-cy="'Expandir-' + index + '-image'"
          class="selected-image is-clickable"
          @click="showImage(index)"
          title="Expandir imagem"
          alt=""
          :src="image"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatImages",
  props: {
    images: Array,
    index: Number,
    editable: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
  data() {
    return {
      selectedImage: {
        show: false,
        src: "",
      },
    };
  },
  methods: {
    removeImage(index) {
      this.$emit("removeImage", index);
    },
    showImage(index) {
      this.selectedImage = {
        show: true,
        src: this.images[index.toString()],
      };
    },
    closeExpandedImage() {
      this.selectedImage = {
        show: false,
        src: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.expanded-box {
  position: fixed;
  z-index: 425;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $whitegroundOpacity;
}
.close-button {
  margin-bottom: 10px;
  margin-right: -34px;
  font-size: 50px;
}

.background-image {
  padding-bottom: 60px;
}

.expanded-image {
  max-width: 1100px;
  max-height: 650px;
  width: 95%;
  height: 95%;
}

.images-box {
  width: 175px;
  margin: 10px 5px;
  background-color: $blackgroundOpacity;
  padding-bottom: 25px;
}

.selected-image {
  width: 125px;
  object-fit: cover;
}

.remove-image {
  font-size: 18px;
  padding-right: 5px;
  padding-top: 2px;
  width: 100%;
  height: 25px;
}
</style>
