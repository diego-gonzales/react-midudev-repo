import { StoryResponse } from '../types';

export const getTopStories = async (page: number, limit: number) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json`
  );
  const data: number[] = await response.json();

  // Here we simulate a pagination. Page starts with 1
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const newData = data.slice(startIndex, endIndex);
  return newData;
};

export const getItemInfo = async (id: number) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return (await response.json()) as StoryResponse;
};

export async function getItemInfo2<T>(id: number) {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return (await response.json()) as T;
}
