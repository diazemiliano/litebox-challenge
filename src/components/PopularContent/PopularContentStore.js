import Apis from "@/api";
import { PopularContentModel } from "@/components/PopularContent/PopularContentModel";

export const POPULAR_CONTENT_STORE = "PopularContentStore";

// STATE NAME CONSTANTS
export const POPULAR = "popular";

// STATE NAME GETTERS
export const GET_POPULAR = "getPopular";

// STATE NAME API CALLS
export const CALL_GET_POPULAR = "getPopular";

// STATE NAME MUTATIONS
export const MUTATE_POPULAR = "mutatePopular";

// BEGIN OF STORE
const getters = {
  [GET_POPULAR]: (state) => state[POPULAR],
};

const actions = {
  [CALL_GET_POPULAR]: function ({ commit }) {
    return Apis.TheMovieDbApi.getPopular()
      .then(({ results }) => {
        const lastFour = results.slice(1, 5);
        const popularInstances = lastFour.map((item) => {
          const {
            id,
            title,
            poster_path: poster,
            vote_average: voteAverage,
            vote_count: voteCount,
          } = item;
          return new PopularContentModel({
            id,
            title,
            poster,
            voteAverage,
            voteCount,
          });
        });

        commit(MUTATE_POPULAR, popularInstances);

        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
};

const mutations = {
  [MUTATE_POPULAR]: function (state, popular) {
    state[POPULAR] = [...popular];
  },
};

const state = {
  [POPULAR]: [],
};

export default {
  state,
  getters,
  mutations,
  actions,
};
