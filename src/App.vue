<template>
  <v-app
    :style="appStyles"
    class="app"
    :class="`break-point-${$vuetify.breakpoint.name}`"
  >
    <main-navigation-drawer />
    <main-top-navigation />
    <movie-uploader-dialog />
    <v-main>
      <template v-if="loading">
        <v-row no-gutters align="center" justify="center" class="fill-height">
          <v-progress-circular
            :size="70"
            :width="7"
            color="#64eebc"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </template>
      <template v-else>
        <router-view />
      </template>
    </v-main>
  </v-app>
</template>

<script>
import MainTopNavigation from "@/components/MainTopNavigation";
import {
  CALL_GET_POPULAR,
  POPULAR_CONTENT_STORE,
} from "@/components/PopularContent/PopularContentStore";
import { mapActions, mapGetters } from "vuex";
import {
  CALL_GET_FEATURED,
  FEATURED_CONTENT_STORE,
  GET_FEATURED,
} from "@/components/FeaturedContent/FeaturedContentStore";
import MainNavigationDrawer from "@/components/MainNavigationDrawer";
import MovieUploaderDialog from "@/components/MovieUploader/MovieUploaderDialog";
import {
  CALL_GET_FAVOURITES,
  FAVOURITE_CONTENT_STORE,
} from "@/components/FavouriteContent/FavouriteContentStore";

export default {
  name: "App",
  components: { MovieUploaderDialog, MainNavigationDrawer, MainTopNavigation },
  computed: {
    ...mapGetters({ loading: "getLoading" }),
    ...mapGetters(FEATURED_CONTENT_STORE, { featured: GET_FEATURED }),
    appStyles() {
      let backgroundImage = [];
      if (this.featured?.id) {
        backgroundImage.push(
          `url("${this.featured.posterUrl({ width: 780 })}")`
        );
      }

      if (this.$vuetify.breakpoint.smAndDown) {
        backgroundImage.unshift(
          "linear-gradient(0deg, rgba(36,36,36,1) 15%, rgba(36,36,36,0) 75%)"
        );
      }

      return {
        backgroundImage: backgroundImage.join(),
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#242424",
      };
    },
  },
  methods: {
    ...mapActions(FEATURED_CONTENT_STORE, {
      callGetFeatured: CALL_GET_FEATURED,
    }),
    ...mapActions(POPULAR_CONTENT_STORE, {
      callGetPopular: CALL_GET_POPULAR,
    }),
    ...mapActions(FAVOURITE_CONTENT_STORE, {
      callGetFavourites: CALL_GET_FAVOURITES,
    }),
    ...mapActions(["setLoading"]),
  },
  created() {
    this.setLoading(true);

    Promise.all([
      this.callGetFeatured(),
      this.callGetPopular(),
      this.callGetFavourites(),
    ])
      .catch((e) => {
        // Handle the Error at UI Here
        console.log(e);
      })
      .finally(() => {
        this.setLoading(false);
      });
  },
};
</script>
