<template>
  <twelve-layout>
    <v-row>
      <template v-for="movie in favourites">
        <favourite-content :key="movie.id" :movie="movie" />
      </template>
    </v-row>
  </twelve-layout>
</template>
<script>
import TwelveLayout from "@/layouts/OneLayout";
import FavouriteContent from "@/components/FavouriteContent/FavouriteContent";
import { mapGetters } from "vuex";
import {
  FAVOURITE_CONTENT_STORE,
  GET_FAVOURITES,
} from "@/components/FavouriteContent/FavouriteContentStore";
import MovieUploaderDialogEventsMixin from "@/components/MovieUploader/MovieUploaderDialogEventsMixin";
export default {
  name: "FavouritesView",
  mixins: [MovieUploaderDialogEventsMixin],
  components: { FavouriteContent, TwelveLayout },
  computed: {
    ...mapGetters(FAVOURITE_CONTENT_STORE, { favourites: GET_FAVOURITES }),
  },
  mounted() {
    this.emitCloseMovieUploaderDialog();
  },
};
</script>
