<template>
  <nine-three-layout class="home-view fill-height align-start">
    <template #nine>
      <featured-content :featured="featured" />
    </template>
    <template #three>
      <main-side-navigation />
    </template>
  </nine-three-layout>
</template>

<script>
import FeaturedContent from "../components/FeaturedContent/FeaturedContent";
import MainSideNavigation from "@/components/MainSideNavigation";
import NineThreeLayout from "@/layouts/NineThreeLayout";
import { mapGetters } from "vuex";
import {
  FEATURED_CONTENT_STORE,
  GET_FEATURED,
} from "@/components/FeaturedContent/FeaturedContentStore";

export default {
  name: "HomeView",
  components: {
    NineThreeLayout,
    MainSideNavigation,
    FeaturedContent,
  },
  computed: {
    ...mapGetters(FEATURED_CONTENT_STORE, { featured: GET_FEATURED }),
  },
};
</script>
<style lang="scss">
.app {
  .home-view {
    .nine-three-layout__nine {
      align-self: center;
    }
    //padding-top: 100px !important;
  }
}
</style>
