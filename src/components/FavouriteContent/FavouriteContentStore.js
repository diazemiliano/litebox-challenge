import Apis from "@/api";
import { ApiConstructor } from "@/api/FavouritesApi/constructor";

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
      .then(({ docs }) => {
        const favourites = docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        commit(MUTATE_FAVOURITES, favourites);
        return Promise.resolve();
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  },
  // eslint-disable-next-line no-unused-vars
  [CALL_POST_FAVOURITES]: function (
    { commit, state },
    {
      favourite = null,
      // eslint-disable-next-line no-unused-vars
      progressCb = ({ bytes, total }) =>
        console.warn(
          `"${FAVOURITE_CONTENT_STORE} > ${CALL_POST_FAVOURITES} > progressCb" not defined`
        ),
    } = {}
  ) {
    if (!favourite) Promise.reject("No favourite to save");
    return new Promise((resolve, reject) => {
      return Apis.FavouritesApi.postFile({ file: favourite.file })
        .then(({ ref }) => {
          progressCb({ bytes: 75, total: favourite.file.size });
          return ApiConstructor.storage.getDownloadURL(ref).then((poster) =>
            Apis.FavouritesApi.postFavourite({
              title: favourite.title,
              poster,
            }).then(() => {
              const newFavourite = {
                title: favourite.title,
                poster,
              };

              commit(MUTATE_FAVOURITES, [...state[FAVOURITES], newFavourite]);

              resolve({
                movie: newFavourite,
              });
            })
          );
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

const mutations = {
  [MUTATE_FAVOURITES]: function (state, favourites) {
    state[FAVOURITES] = [...favourites];
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
