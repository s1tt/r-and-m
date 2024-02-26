import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { getCharacters } from '../api/chracters';
import CardList from '../components/CardList';
import DesktopMenu from '../components/DesktopMenu';
import { Filters } from '../components/Filters';
import MobileMenu from '../components/MobileMenu';
import { Character } from '../types/character';

const StyledMainPage = styled.section`
  display: flex;
  gap: 10px;
`;

export interface IQueryParams {
  status?: Character['status'] | null;
  gender?: Character['gender'] | null;
  name?: string | null;
  page: number;
}

const initialQuery: IQueryParams = {
  status: null,
  gender: null,
  name: null,
  page: 1
};

const MainPage = () => {
  const [queryParams, setQueryParams] = useState(initialQuery);

  const {
    data: characters,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: [
      'characters',
      queryParams.status,
      queryParams.name,
      queryParams.gender
    ],
    queryFn: props => getCharacters(props, queryParams),
    retry: 0,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.info.pages !== pages.length + 1) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    }
  });

  return (
    <StyledMainPage>
      <CardList
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        characters={characters}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
      />
      <DesktopMenu>
        <Filters
          setQueryParams={setQueryParams}
          queryParams={queryParams}
          isFetching={isFetching}
        />
      </DesktopMenu>
      <MobileMenu>
        <Filters
          setQueryParams={setQueryParams}
          queryParams={queryParams}
          isFetching={isFetching}
        />
      </MobileMenu>
    </StyledMainPage>
  );
};

export default MainPage;
