// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      card: {
        border: string;
        boxShadow: string;
        charactersBackground: {
          male: string;
          female: string;
          genderless: string;
          unknown: string;
        };
        charactersStatus: {
          alive: string;
          dead: string;
          unknown: string;
        };
      };
      textMain: string;
      textSecondary: string;
      main: string;
      secondary: string;
    };
  }
}
