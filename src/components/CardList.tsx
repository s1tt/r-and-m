import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes } from 'styled-components';
import { getCharacters } from '../api/chracters';
import { IQueryParams } from '../pages/MainPage';
import CharacterCard from './CharacterCard';
import CharactersNotFound from './CharactersNotFound';

interface CardListProps {
  queryParams: IQueryParams;
  setQueryParams: (prev: IQueryParams) => void;
}

const CardList = ({ queryParams, setQueryParams }: CardListProps) => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        'characters',
        queryParams.status,
        queryParams.name,
        queryParams.gender
      ],
      queryFn: props => getCharacters(props, queryParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.info.pages !== pages.length + 1) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      }
    });

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
        {!isFetching && !data && <CharactersNotFound />}
        {isFetching && !isFetchingNextPage ? (
          <StyledLoadingImage src='/LoadingImage.png' alt='Loading' />
        ) : (
          data &&
          data?.pages.slice(0, queryParams.page).map(page =>
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
          )
        )}
      </CardListWrapper>

      {data && !data.pages[data.pages.length - 1].info.next && (
        <StyledBottomText>No more data!</StyledBottomText>
      )}

      {/* {data && data.pages[data.pages.length - 1].info.next ? (
        <StyledBottomText ref={ref}>Loading...</StyledBottomText>
      ) : (
        <StyledBottomText>No more data!</StyledBottomText>
      )} */}
    </StyledSection>
  );
};

export default CardList;

const loadingImageAnimation = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

const StyledLoadingImage = styled.img`
  display: flex;
  margin: 0 auto;
  align-items: center;
  width: 100%;
  animation: ${loadingImageAnimation} 1s infinite;
`;

const CardListWrapper = styled.ul`
  flex: 1;
  margin-left: 310px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  gap: 90px 0;

  @media screen and (max-width: 901px) {
    margin-left: 0;
  }
`;

const StyledSection = styled.section`
  width: 100%;
`;

const StyledBottomText = styled.p`
  text-align: center;
  padding: 40px 0;
`;
