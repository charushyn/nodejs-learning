import NodeCache from "node-cache";
import { Query, FlattenMaps } from "mongoose";
import { MovieType } from "../../entities/movie/model";

export default async function getMovieCache(
  query: Query<FlattenMaps<MovieType[]>, MovieType>,
  store: NodeCache
): Promise<FlattenMaps<unknown>> {
  if (store.has("defaultMovies")) {
    return store.get("defaultMovies") as FlattenMaps<MovieType>[];
  } else {
    const cache_to_set = await query.lean().populate("director").exec();
    store.set("defaultMovies", cache_to_set, 3600);
    return cache_to_set;
  }
}
