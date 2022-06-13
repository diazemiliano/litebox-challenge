const TMDB_IMAGE_API = process.env.VUE_APP_TMDB_IMAGE_API;

export class BaseContentModel {
  constructor({ id = null, title = null, poster = null } = {}) {
    this.id = id;
    this.title = title;
    this.poster = poster;
  }

  /**
   * Returns the full path to the image
   * @param width
   * @returns {string}
   */
  posterUrl = ({ width = 342 } = {}) => {
    return `${TMDB_IMAGE_API}/w${width}${this.poster}`;
  };
}
