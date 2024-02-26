import { IQueryParams } from '../pages/MainPage';
import { getCharactersResponse } from '../types/character';
import { BASE_URL } from '../utils/constants';
import { getCharacterQueryString } from '../utils/getCharacterQueryString';

export const getCharacters = async (
  { pageParam }: { pageParam: number },
  queryParams: IQueryParams
): Promise<getCharactersResponse> => {
  const queries = getCharacterQueryString(queryParams);
  const res = await fetch(
    `${BASE_URL}/character/?page=${pageParam}${queries ? `&${queries}` : ''}`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json() as Promise<getCharactersResponse>;
};
