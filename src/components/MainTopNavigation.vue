<template>
  <v-app-bar
    flat
    color="transparent"
    height="72"
    class="header-bar flex-grow-0"
  >
    <template v-if="buttons.includes('logo')">
      <div
        @click="$route.path !== '/' && $router.push('/')"
        class="header-bar__logo d-inline-block align-end order-1 order-md-0 ma-auto ma-md-0"
      >
        Lite<span class="header-bar__logo--light font-weight-thin">Flix</span>
      </div>
    </template>

    <template v-if="buttons.includes('close')">
      <v-btn
        class="ml-2 ml-md-8 order-0"
        text
        color="white"
        width="27"
        height="27"
        min-width="27"
        max-width="27"
        @click="handleMenuButtonClick(false)"
      >
        <v-img :src="require('@/assets/x-icon.svg')" />
      </v-btn>
    </template>

    <template v-if="buttons.includes('add')">
      <div class="d-none d-md-flex align-start">
        <v-btn
          text
          class="header-bar button--text"
          color="white"
          @click="handleAddMovieClick"
        >
          <v-img
            :src="require('@/assets/plus-icon.svg')"
            height="15"
            width="15"
          />
          <span>Agregar Película</span>
        </v-btn>
      </div>
    </template>

    <v-spacer class="d-none d-md-flex" />

    <template v-if="buttons.includes('menu')">
      <v-btn
        class="ml-0 ml-md-6 order-0 order-md-1"
        text
        color="white"
        width="27"
        height="27"
        min-width="27"
        max-width="27"
        @click="handleMenuButtonClick(true)"
      >
        <v-img :src="require('@/assets/app-menu-icon.svg')" />
      </v-btn>
    </template>
    <template v-if="buttons.includes('bell')">
      <v-btn
        class="ml-6 d-none d-md-flex order-2"
        :class="{ 'd-flex': getDrawer }"
        text
        color="white"
        width="27"
        height="27"
        min-width="27"
        max-width="27"
      >
        <v-img :src="require('@/assets/app-bell-icon.svg')" />
      </v-btn>
    </template>
    <v-btn
      class="ml-6 order-3"
      text
      color="white"
      width="27"
      height="27"
      min-width="27"
      max-width="27"
    >
      <v-avatar size="36px">
        <img
          alt="Avatar"
          src="https://avatars.githubusercontent.com/u/64487650?v=4"
        />
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MovieUploaderDialogEventsMixin from "@/components/MovieUploader/MovieUploaderDialogEventsMixin";

export default {
  name: "main-top-navigation",
  mixins: [MovieUploaderDialogEventsMixin],
  props: {
    buttons: {
      type: Array,
      default: () => ["logo", "add", "menu", "bell", "notifications", "user"],
      validator: (value) => value.some((val) => value.includes(val)),
    },
  },
  computed: {
    ...mapGetters(["getDrawer"]),
  },
  methods: {
    ...mapActions({ handleMenuButtonClick: "showDrawer" }),
    handleAddMovieClick() {
      this.emitOpenMovieUploaderDialog();
    },
  },
};
</script>
<style lang="scss">
.app {
  &.break-point-sm,
  &.break-point-xs {
    .header-bar {
      z-index: 300;
      padding-left: 40px;
      padding-right: 40px;
    }
  }

  .v-navigation-drawer {
    .header-bar {
      padding-left: 8px;
    }
  }

  .header-bar {
    padding-left: 180px;
    padding-right: 180px;

    .v-toolbar__content {
      padding-top: 35px;
      padding-right: 0;
      padding-left: 0;
    }

    &__logo {
      vertical-align: middle;
      letter-spacing: 4px;
      font-size: 34px;
      line-height: 33px;
      font-weight: 700;
      color: $font-primary-color;
      cursor: pointer;
    }

    &.button--text {
      &.v-btn.v-size--default {
        & .v-image {
          top: -1px;
        }

        & span {
          margin-left: 12px;
          position: relative;
        }
      }
    }
  }
}
</style>
