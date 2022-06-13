<template>
  <v-img
    :src="movie.posterUrl()"
    :lazy-src="movie.posterUrl({ width: 92 })"
    class="popular-content-thumb rounded mb-4"
    min-width="220"
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
          <template>
            <div class="title-container d-flex align-center justify-center">
              <img
                width="40"
                height="40"
                :src="require('@/assets/play-circle-icon.svg')"
              />
              <h3 class="bottom-title">
                <span class="font-weight-thin">{{ movie.title }}</span>
              </h3>
            </div>
          </template>
        </v-fade-transition>
      </v-row>
    </template>
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center"></v-row>
    </template>
  </v-img>
</template>
<script>
import { BaseContentModel } from "@/components/FavouriteContent/FavouriteContentModel";

export default {
  name: "favourite-content",
  props: {
    /** @type {BaseContentModel} */
    movie: {
      validator: (value) => value instanceof BaseContentModel,
      required: true,
    },
  },
  mounted() {
    console.log(this.movie);
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
