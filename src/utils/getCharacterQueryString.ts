import { IQueryParams } from '../pages/MainPage';

export const getCharacterQueryString = (queryParams: IQueryParams) => {
  const query = new URLSearchParams();
  if (queryParams.status)
    query.set('status', queryParams.status.toLocaleLowerCase());
  if (queryParams.gender)
    query.set('gender', queryParams.gender.toLocaleLowerCase());
  if (queryParams.name) query.set('name', queryParams.name);
  return query.toString();
};
