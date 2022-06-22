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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA930w0GHlujALPXg3Fnhvd0n6yPEHeelw",
  authDomain: "striped-bastion-354012.firebaseapp.com",
  projectId: "striped-bastion-354012",
  storageBucket: "striped-bastion-354012.appspot.com",
  messagingSenderId: "712725761829",
  appId: "1:712725761829:web:22932c00f23f3840fe14cc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const firebaseStore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

const storageRef = ref(firebaseStorage, "posters/some-child");
console.log(storageRef);

// 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log("Uploaded a blob or file!");
// });

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
