import { useEffect, useState } from "react";
import { getCatImageUrlByKeyword } from "../services/cats";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export const useCatImageUrl = ({ fact }: { fact: string }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ")[0];
    getCatImageUrlByKeyword(firstWord).then((url) => setImageUrl(url));
  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}/${imageUrl}` };
};
