import { useState } from 'react';
import styled from 'styled-components';
import CardList from '../components/CardList';
import DesktopMenu from '../components/DesktopMenu';
import Filters from '../components/Filters';
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
  return (
    <StyledMainPage>
      {/* <Filters setQueryParams={setQueryParams} queryParams={queryParams} /> */}
      <CardList queryParams={queryParams} setQueryParams={setQueryParams} />
      <DesktopMenu>
        <Filters setQueryParams={setQueryParams} queryParams={queryParams} />
      </DesktopMenu>
      <MobileMenu>
        <Filters setQueryParams={setQueryParams} queryParams={queryParams} />
      </MobileMenu>
    </StyledMainPage>
  );
};

export default MainPage;
