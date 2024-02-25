import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { BurgerMenuProvider } from './contexts/BurgerMenuContext.tsx';
import './index.css';

const queryClient = new QueryClient();

export const theme: DefaultTheme = {
  borderRadius: '10px',
  colors: {
    card: {
      border: '#C1D564',
      boxShadow: '#9dc68e',
      charactersBackground: {
        male: '#0a1b04',
        female: '#4c2929;',
        genderless: '#88813c',
        unknown: '#25494c'
      },
      charactersStatus: {
        alive: '#8fcd78',
        dead: '#ff6b6b',
        unknown: '#565a5a'
      }
    },
    textMain: '#ffffff',
    textSecondary: '#000000',
    main: 'cyan',
    secondary: 'magenta'
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BurgerMenuProvider>
          <App />
        </BurgerMenuProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
