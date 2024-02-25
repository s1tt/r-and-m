import styled from 'styled-components';
import Header from './components/Header';
import MainPage from './pages/MainPage';

const MainWrapper = styled.main`
  padding: 0 2rem 2rem 2rem;
  margin-top: 200px;
`;
function App() {
  return (
    <>
      <Header />
      <MainWrapper>
        <MainPage />
      </MainWrapper>
    </>
  );
}

export default App;
