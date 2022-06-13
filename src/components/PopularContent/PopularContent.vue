<template>
  <v-col sm="12" md="6" lg="12" class="justify-center">
    <v-img
      :src="movie.posterUrl()"
      :lazy-src="movie.posterUrl({ width: 92 })"
      class="popular-content-thumb rounded mb-4"
      min-width="220"
      min-height="146"
      aspect-ratio="1.8"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <template v-slot:default>
        <v-row
          class="fill-height ma-0 text-center"
          align="center"
          justify="center"
        >
          <v-fade-transition>
            <template v-if="!infoSheet">
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
          <v-fade-transition>
            <template v-if="infoSheet">
              <div class="info-sheet d-flex fill-height justify-end">
                <v-row class="ma-3 text-left" align-content="end">
                  <div class="d-flex align-center pa-0 mb-6">
                    <image-hover
                      :src="require('@/assets/play-circle-icon.svg')"
                      :src-hover="
                        require('@/assets/play-circle-icon-hover.svg')
                      "
                    />

                    <h3 class="d-inline-flex">
                      <span class="font-weight-thin ml-3">
                        {{ movie.title }}
                      </span>
                    </h3>
                  </div>

                  <v-col cols="12" class="popular-content-thumb__details pa-0">
                    <div class="float-left">
                      <img
                        width="12"
                        height="12"
                        :src="require('@/assets/star-icon.svg')"
                      />
                      <span class="ml-2">{{ movie.voteAverage }}</span>
                    </div>
                    <div class="float-right">
                      <span>{{ movie.voteCount }}</span>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </template>
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
import { PopularContentModel } from "@/components/PopularContent/PopularContentModel";

export default {
  name: "popular-content",
  components: { ImageHover },
  props: {
    /** @type {PopularContentModel} */
    movie: {
      validator: (value) => value instanceof PopularContentModel,
      required: true,
    },
  },
  data() {
    return {
      infoSheet: false,
    };
  },
  methods: {
    handleMouseEnter() {
      this.infoSheet = true;
    },
    handleMouseLeave() {
      this.infoSheet = false;
    },
  },
  mounted() {
    // console.log(this.movie);
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
