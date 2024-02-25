import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../hooks/useDebounce';
import { IQueryParams } from '../pages/MainPage';
import { Character } from '../types/character';
import Input from './Input';
import RadioButton from './RadioButton';

interface FiltersProps {
  queryParams: IQueryParams;
  setQueryParams: (prev: IQueryParams) => void;
}

const Filters = ({ setQueryParams, queryParams }: FiltersProps) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedFilterName = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      name: debouncedFilterName,
      page: 1
    });
  }, [debouncedFilterName]);

  const setQueryParamsHandler = (
    key: keyof IQueryParams,
    value: Character['status' | 'gender']
  ) => {
    setQueryParams({
      ...queryParams,
      [key]: queryParams[key] === value ? null : value
    });
  };

  return (
    <StyledFilters>
      <div>
        <img src={'/space-cruiser.png'} alt='space-cruiser' width={'100%'} />
        <img src={'/logo.png'} alt='space-cruiser' width={'100%'} />
      </div>
      <StyledFilterSection>
        <h3>Status</h3>
        <ButtonsGroup>
          <RadioButton
            value='Alive'
            name='status'
            checked={queryParams.status === 'Alive'}
            label='Alive'
            onChange={() => setQueryParamsHandler('status', 'Alive')}
          />

          <RadioButton
            value='Dead'
            name='status'
            checked={queryParams.status === 'Dead'}
            label='Dead'
            onChange={() => setQueryParamsHandler('status', 'Dead')}
          />
          <RadioButton
            value='unknown'
            name='status'
            checked={queryParams.status === 'unknown'}
            label='Unknown'
            onChange={() => setQueryParamsHandler('status', 'unknown')}
          />
        </ButtonsGroup>
      </StyledFilterSection>
      <StyledFilterSection>
        <h3>Gender</h3>
        <ButtonsGroup>
          <RadioButton
            value='Male'
            name='gender'
            checked={queryParams.gender === 'Male'}
            label='Male'
            onChange={() => setQueryParamsHandler('gender', 'Male')}
          />

          <RadioButton
            value='Female'
            name='gender'
            checked={queryParams.gender === 'Female'}
            label='Female'
            onChange={() => setQueryParamsHandler('gender', 'Female')}
          />
          <RadioButton
            value='Genderless'
            name='gender'
            checked={queryParams.gender === 'Genderless'}
            label='Genderless'
            onChange={() => setQueryParamsHandler('gender', 'Genderless')}
          />
          <RadioButton
            value='unknown'
            name='gender'
            checked={queryParams.gender === 'unknown'}
            label='Unknown'
            onChange={() => setQueryParamsHandler('gender', 'unknown')}
          />
        </ButtonsGroup>
      </StyledFilterSection>
      <StyledFilterSection>
        <h3>Search by name</h3>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Search by name'
        />
      </StyledFilterSection>
    </StyledFilters>
  );
};

export default Filters;

const StyledFilters = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const StyledFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
