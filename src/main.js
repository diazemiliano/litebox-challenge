import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./main.scss";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import PopularContentStore, {
  POPULAR_CONTENT_STORE,
} from "@/components/PopularContent/PopularContentStore";
import RegisterModuleMixin from "@/mixins/RegisterModuleMixin";
import FeaturedContentStore, {
  FEATURED_CONTENT_STORE,
} from "@/components/FeaturedContent/FeaturedContentStore";
import FavouriteContentStore, {
  FAVOURITE_CONTENT_STORE,
} from "@/components/FavouriteContent/FavouriteContentStore";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  mixins: [RegisterModuleMixin],
  render: (h) => h(App),
  created() {
    // Register all Stores will to be used.
    this.registerVuexModule({
      name: FEATURED_CONTENT_STORE,
      opts: FeaturedContentStore,
    });
    this.registerVuexModule({
      name: POPULAR_CONTENT_STORE,
      opts: PopularContentStore,
    });
    this.registerVuexModule({
      name: FAVOURITE_CONTENT_STORE,
      opts: FavouriteContentStore,
    });
  },
}).$mount("#app");
