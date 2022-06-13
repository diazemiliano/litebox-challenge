import Apis from "@/api";
import { BaseContentModel } from "@/components/FavouriteContent/FavouriteContentModel";

export const FEATURED_CONTENT_STORE = "FeaturedContentStore";

// STATE NAME CONSTANTS
export const FEATURED = "featured";

// STATE NAME GETTERS
export const GET_FEATURED = "getFeatured";

// STATE NAME API CALLS
export const CALL_GET_FEATURED = "getFeatured";

// STATE NAME MUTATIONS
export const MUTATE_FEATURED = "mutateFeatured";

// BEGIN OF STORE
const getters = {
  [GET_FEATURED]: (state) => state[FEATURED],
};

const actions = {
  [CALL_GET_FEATURED]: function ({ commit }) {
    return Apis.TheMovieDbApi.getFeatured()
      .then(({ results }) => {
        const lastPlayed = results[0];

        const {
          id,
          title,
          poster_path: poster,
          vote_average: voteAverage,
          vote_count: voteCount,
        } = lastPlayed;

        const featuredInstance = new BaseContentModel({
          id,
          title,
          poster,
          voteAverage,
          voteCount,
        });

        commit(MUTATE_FEATURED, featuredInstance);
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
};

const mutations = {
  [MUTATE_FEATURED]: function (state, featured) {
    state[FEATURED] = { ...featured };
  },
};

const state = {
  [FEATURED]: {},
};

export default {
  state,
  getters,
  mutations,
  actions,
};
