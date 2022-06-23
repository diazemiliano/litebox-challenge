<template>
  <v-col sm="12" md="4" class="justify-center">
    <v-img
      :src="movie.poster"
      :lazy-src="movie.poster"
      class="popular-content-thumb rounded"
      min-height="146"
      aspect-ratio="1.8"
    >
      <template v-slot:default>
        <v-row
          class="fill-height ma-0 text-center"
          align="center"
          justify="center"
        >
          <v-fade-transition>
            <div class="title-container d-flex align-center justify-center">
              <image-hover
                width="40"
                height="40"
                :src="require('@/assets/play-circle-icon.svg')"
                :src-hover="require('@/assets/play-circle-icon-hover.svg')"
              />

              <h3 class="bottom-title">
                <span class="font-weight-thin">{{ movie.title }}</span>
              </h3>
            </div>
          </v-fade-transition>
        </v-row>
      </template>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center"></v-row>
      </template>
    </v-img>
  </v-col>
</template>
<script>
import ImageHover from "@/components/ImageHover";
import { BaseContentModel } from "@/components/FavouriteContent/FavouriteContentModel";

export default {
  name: "PopularContent",
  components: { ImageHover },
  props: {
    /** @type {BaseContentModel} */
    movie: {
      validator: (value) => value instanceof BaseContentModel,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.popular-content-thumb {
  cursor: pointer;

  &.v-image {
    span {
      color: white !important;
      letter-spacing: 2px;
      font-size: 14px;
    }
  }

  h3 {
    color: white;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 4px;

    &.bottom-title {
      position: absolute;
      bottom: 14px;
    }
  }

  .title-container {
    height: 100%;
    width: 100%;
  }

  .info-sheet {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(36, 36, 36, 0.7);
  }
}
</style>
