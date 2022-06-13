import { BaseContentModel } from "@/components/FavouriteContent/FavouriteContentModel";

export class PopularContentModel extends BaseContentModel {
  constructor({
    id = null,
    title = null,
    poster = null,
    voteAverage = null,
    voteCount = null,
  } = {}) {
    super({ id, title, poster });

    this.voteAverage = voteAverage;
    this.voteCount = voteCount;
  }
}
