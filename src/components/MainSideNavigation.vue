<template>
  <v-row align="center" justify="center">
    <dropdown :items="menuItems" v-model="selectedItem" />

    <template v-for="movie in popular">
      <popular-content :key="movie.id" :movie="movie" />
    </template>
  </v-row>
</template>

<script>
import PopularContent from "@/components/PopularContent/PopularContent";
import Dropdown from "@/components/Dropdown";
import { mapGetters } from "vuex";
import {
  GET_POPULAR,
  POPULAR_CONTENT_STORE,
} from "@/components/PopularContent/PopularContentStore";

export default {
  name: "MainSideNavigation",
  components: { Dropdown, PopularContent },
  data() {
    const menuItems = [
      { title: "Populares" },
      { title: "Mis Películas", navigate: "/favourites" },
    ];

    return {
      menuItems,
      selectedItem: menuItems[0],
    };
  },
  computed: {
    ...mapGetters(POPULAR_CONTENT_STORE, { popular: GET_POPULAR }),
  },
  watch: {
    selectedItem({ navigate }) {
      if (navigate) {
        this.$router.push(navigate);
      }
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  color: white;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 4px;
  position: absolute;
  bottom: 14px;
}
</style>
