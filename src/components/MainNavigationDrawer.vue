<template>
  <v-navigation-drawer
    v-model="navigation"
    absolute
    temporary
    dark
    floating
    color="#242424"
    overlay-color="#242424"
    overlay-opacity="0.9"
    :right="$vuetify.breakpoint.mdAndUp"
    :width="$vuetify.breakpoint.mdAndUp ? `700px` : `100%`"
  >
    <slot name="prepend">
      <main-top-navigation
        :buttons="[
          $vuetify.breakpoint.smAndDown ? 'logo' : null,
          $vuetify.breakpoint.mdAndUp ? 'bell' : null,
          'close',
          'user',
        ]"
      />
    </slot>
    <v-list flat>
      <v-list-item-group :value="0" active-class="font-weight-medium">
        <v-list-item to="/">
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Series</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Peliculas</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Agregadas Recientemente</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Populares</v-list-item-title>
        </v-list-item>

        <v-list-item to="/favourites">
          <v-list-item-title>Mis Peliculas</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Mi Lista</v-list-item-title>
        </v-list-item>

        <v-list-item class="my-12" @click="handleAddMovieClick">
          <v-list-item-icon class="mr-0">
            <img :src="require('@/assets/plus-icon.svg')" />
          </v-list-item-icon>
          <v-list-item-title> Agregar Pelicula</v-list-item-title>
        </v-list-item>

        <v-list-item class="my-12">
          <v-list-item-title>Cerrar Sesion</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MainTopNavigation from "@/components/MainTopNavigation";
import MovieUploaderDialogEventsMixin from "@/components/MovieUploader/MovieUploaderDialogEventsMixin";

export default {
  name: "MainNavigationDrawer",
  mixins: [MovieUploaderDialogEventsMixin],
  components: { MainTopNavigation },
  computed: {
    ...mapState(["drawer"]),
    navigation: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.showDrawer(val);
      },
    },
  },
  methods: {
    ...mapActions(["showDrawer"]),
    handleAddMovieClick() {
      this.navigation = false;
      this.emitOpenMovieUploaderDialog();
    },
  },
};
</script>

<style lang="scss">
.app {
  &.break-point-sm,
  &.break-point-xs {
    .v-navigation-drawer {
      .v-list {
        padding-left: 10px;
      }
    }
  }

  .v-navigation-drawer {
    z-index: 302;
    .v-list {
      padding-left: 30px;

      .v-list-item .v-list-item__title {
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 4px;
      }

      .v-list-item:not([class*="font-weight-"]) .v-list-item__title {
        font-weight: 100;
      }
    }
  }
}
</style>
