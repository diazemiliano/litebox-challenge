<template>
  <v-row class="featured-content mb-16 text-center text-sm-left">
    <v-col cols="12">
      <h3 class="featured-content__sub pb-6">
        <span class="font-weight-regular">Original de </span>
        Lite<span class="font-weight-regular"> flix </span>
      </h3>
      <h2 class="featured-content__title text-left font-weight-bold">
        {{ featured.title }}
      </h2>

      <v-btn
        tile
        dark
        :block="$vuetify.breakpoint.xsOnly"
        height="56"
        width="248"
        class="featured-content__button mb-6 mb-sm-0 mr-sm-6"
      >
        <v-img max-width="14" :src="require('@/assets/play-icon.svg')" />
        <span>Reproducir</span>
      </v-btn>
      <v-btn
        tile
        dark
        :block="$vuetify.breakpoint.xsOnly"
        height="56"
        width="248"
        class="featured-content__button featured-content__button--transparent"
        to="/favourites"
      >
        <v-img max-width="15" :src="require('@/assets/plus-icon.svg')" />
        <span>Mi Lista</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FeaturedContent",
  props: {
    featured: {},
  },
};
</script>

<style scoped lang="scss">
.app {
  &.break-point-sm,
  &.break-point-xs {
    .featured-content {
      &__title {
        font-size: 76px;
        line-height: 78px;
        letter-spacing: 12px;
      }
    }
  }

  .featured-content {
    text-transform: uppercase;

    &__title {
      margin-left: -4px;
      margin-bottom: 32px;
      font-size: 120px;
      line-height: 100px;
      letter-spacing: 16px;
      word-break: normal;
      text-overflow: ellipsis;
      overflow: hidden;
      color: $font-primary-color;
    }

    &__sub {
      font-size: 20px;
      line-height: 20px;
      letter-spacing: 4px;
      color: white;
    }

    &__button {
      &.v-btn {
        background-color: $featured-button-bg-color;
        color: white;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 4px;

        span {
          margin-left: 12px;
        }
      }

      &--transparent {
        &.v-btn {
          background-color: rgba($featured-button-bg-color, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>
