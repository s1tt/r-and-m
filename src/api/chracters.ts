import { IQueryParams } from '../pages/MainPage';
import { getAllCharactersResponse } from '../types/character';
import { BASE_URL } from '../utils/constants';
import { getCharacterQueryString } from '../utils/getCharacterQueryString';

export const getCharacters = async (
  { pageParam }: { pageParam: number },
  queryParams: IQueryParams
): Promise<getAllCharactersResponse> => {
  const resString = getCharacterQueryString(queryParams);
  const res = await fetch(
    `${BASE_URL}/character/?page=${pageParam}${
      resString ? `&${resString}` : ''
    }`
  );
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json() as Promise<getAllCharactersResponse>;
};
