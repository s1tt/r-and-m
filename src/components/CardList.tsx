import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { memo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { IQueryParams } from '../pages/MainPage';
import { getCharactersResponse } from '../types/character';
import CharacterCard from './CharacterCard';
import CharactersNotFound from './CharactersNotFound';
import SkeletonCharacterCard from './SkeletonCharacterCard';

interface CardListProps {
  queryParams: IQueryParams;
  setQueryParams: (prev: IQueryParams) => void;
  characters: InfiniteData<getCharactersResponse, unknown> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<getCharactersResponse, unknown>,
      Error
    >
  >;
  isFetching: boolean;
  isFetchingNextPage: boolean;
}

const CardList = ({
  queryParams,
  setQueryParams,
  characters,
  fetchNextPage,
  isFetching,
  isFetchingNextPage
}: CardListProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [queryParams.status]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      setQueryParams({
        ...queryParams,
        page: queryParams.page + 1
      });
    }
  }, [fetchNextPage, inView, setQueryParams]);

  return (
    <StyledSection>
      <CardListWrapper>
        {!isFetching && !characters && <CharactersNotFound />}
        {characters &&
          characters?.pages.slice(0, queryParams.page).map(page =>
            page.results.map(character => (
              <li
                key={character.id}
                ref={
                  page.results[page.results.length - 1].id === character.id
                    ? ref
                    : null
                }
              >
                <CharacterCard character={character} />
              </li>
            ))
          )}
        {(isFetching || isFetchingNextPage) &&
          new Array(4).fill(null).map((_, index) => (
            <li key={index}>
              <SkeletonCharacterCard />
            </li>
          ))}
      </CardListWrapper>
    </StyledSection>
  );
};
const MemoizedCardList = memo(CardList);

export { MemoizedCardList as MainPage };
export default CardList;

const CardListWrapper = styled.ul`
  flex: 1;
  margin-left: 310px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 90px 0;

  @media screen and (max-width: 901px) {
    margin-left: 0;
  }
`;

const StyledSection = styled.section`
  width: 100%;
`;
