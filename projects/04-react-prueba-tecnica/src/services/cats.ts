import { CatsImageResponse } from "../models/cats-image.interface";

export const getCatImageUrlByKeyword = async (keyword: string) => {
  const resp = await fetch(`https://cataas.com/cat/says/${keyword}?size=50&color=red&json=true`);
  const { url }: CatsImageResponse = await resp.json();
  return url;
};
