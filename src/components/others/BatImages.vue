<template>
  <div class="flex-justify-center">
    <div class="expanded-box flex-justify-center" v-if="selectedImage.show">
      <div class="box">
        <div class="is-clickable close-button text-primary flex-justify-end">
          <i @click="closeExpandedImage(index)" class="far fa-times-circle" />
        </div>
        <img class="expanded-image" alt="" :src="selectedImage.src" />
      </div>
    </div>
    <div
      class="flex-column-end images-box"
      v-for="(image, index) in images"
      :key="index"
    >
      <div v-if="editable" class="is-clickable remove-button flex-justify-end">
        <i
          @click="removeImage(index)"
          v-if="editable"
          class="far fa-times-circle"
        />
      </div>
      <img
        class="selected-image is-clickable"
        @click="showImage(index)"
        alt=""
        :src="image"
      />
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
  data() {
    return {
      selectedImage: {
        show: false,
        src: "",
      },
    };
  },
  mounted() {
    console.log(this.editable);
  },
  methods: {
    removeImage(index) {
      this.$emit("removeImage", index);
    },
    showImage(index) {
      console.log(this.images);
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
  background-color: $backGroundOpacity;
}

.selected-image {
  height: 120px;
  object-fit: cover;
}

.expanded-image {
  max-width: 1100px;
  max-height: 600px;
}

.close-button {
  margin-bottom: 10px;
  margin-right: -30px;
  font-size: 50px;
}

.remove-button {
  margin-bottom: 3px;
}

.box {
  position: fixed;
  top: 100px;
}

.images-box {
  padding: 10px;
}
</style>
