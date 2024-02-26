import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from '../hooks/useDebounce';
import { IQueryParams } from '../pages/MainPage';
import { Character } from '../types/character';
import Input from './Input';
import RadioButton from './RadioButton';

interface FiltersProps {
  queryParams: IQueryParams;
  setQueryParams: (prev: IQueryParams) => void;
  isFetching: boolean;
}

const Filters = ({ setQueryParams, queryParams, isFetching }: FiltersProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const debouncedFilterName = useDebounce<string | undefined>(
    inputRef.current?.value,
    500
  );

  useEffect(() => {
    setQueryParams({
      ...queryParams,
      name: debouncedFilterName || null,
      page: 1
    });
  }, [debouncedFilterName]);

  useEffect(() => {
    if (isInputFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputFocused, isFetching]);

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
            disabled={isFetching}
          />

          <RadioButton
            value='Dead'
            name='status'
            checked={queryParams.status === 'Dead'}
            label='Dead'
            onChange={() => setQueryParamsHandler('status', 'Dead')}
            disabled={isFetching}
          />
          <RadioButton
            value='unknown'
            name='status'
            checked={queryParams.status === 'unknown'}
            label='Unknown'
            onChange={() => setQueryParamsHandler('status', 'unknown')}
            disabled={isFetching}
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
            disabled={isFetching}
          />

          <RadioButton
            value='Female'
            name='gender'
            checked={queryParams.gender === 'Female'}
            label='Female'
            onChange={() => setQueryParamsHandler('gender', 'Female')}
            disabled={isFetching}
          />
          <RadioButton
            value='Genderless'
            name='gender'
            checked={queryParams.gender === 'Genderless'}
            label='Genderless'
            onChange={() => setQueryParamsHandler('gender', 'Genderless')}
            disabled={isFetching}
          />
          <RadioButton
            value='unknown'
            name='gender'
            checked={queryParams.gender === 'unknown'}
            label='Unknown'
            onChange={() => setQueryParamsHandler('gender', 'unknown')}
            disabled={isFetching}
          />
        </ButtonsGroup>
      </StyledFilterSection>
      <StyledFilterSection>
        <h3>Search by name</h3>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='Search by name'
          disabled={isFetching}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </StyledFilterSection>
    </StyledFilters>
  );
};

const MemoizedFilters = memo(Filters);

export { MemoizedFilters as Filters };

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
