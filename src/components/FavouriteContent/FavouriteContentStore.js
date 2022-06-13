import Apis from "@/api";

export const FAVOURITE_CONTENT_STORE = "FavouriteContentStore";

// STATE NAME CONSTANTS
export const FAVOURITES = "favourites";

// STATE NAME GETTERS
export const GET_FAVOURITES = "getFavourites";

// STATE NAME API CALLS
export const CALL_GET_FAVOURITES = "getFavourites";
export const CALL_POST_FAVOURITES = "postFavourites";

// STATE NAME MUTATIONS
export const MUTATE_FAVOURITES = "mutateFavourites";

// BEGIN OF STORE
const getters = {
  [GET_FAVOURITES]: (state) => state[FAVOURITES],
};

const actions = {
  [CALL_GET_FAVOURITES]: function ({ commit }) {
    return Apis.FavouritesApi.getFavourites()
      .then(({ results }) => {
        const lastPlayed = results[0];
        commit(MUTATE_FAVOURITES, lastPlayed);
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  [CALL_POST_FAVOURITES]: function ({ commit }, { favourite = null } = {}) {
    if (!favourite) Promise.reject("No favourite to save");

    return Apis.FavouritesApi.postFavourite({ favourite })
      .then(({ results }) => {
        const lastPlayed = results[0];
        commit(MUTATE_FAVOURITES, lastPlayed);
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
};

const mutations = {
  [MUTATE_FAVOURITES]: function (state, featured) {
    state[FAVOURITES] = { ...featured };
  },
};

const state = {
  [FAVOURITES]: [],
};

export default {
  state,
  getters,
  mutations,
  actions,
};
