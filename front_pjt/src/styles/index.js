import { createGlobalStyle } from 'styled-components';

export function isPC() {
  const pc = ['win16', 'win32', 'win64', 'mac', 'macintel'];

  if (pc.indexOf(navigator.platform.toLowerCase()) < 0) {
    return false;
  }
  return true;
}

const size = {
  xsmall: '450px',
  small: '770px',
  medium: '1220px',
  large: '1700px',
};

const colors = {
  lightPink: '#F4EDED',
  pink: '#FFAAC7',
  hotPink: '#FF4081',

  lightblue: '#BEEDEF',

  success: '#20C239',
  warning: '#FACA22',
  danger: '#E5503C',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#EBEBEB',
  lineGray: '#F2F2F2',
  gray: '#D9D9D9',
  darkGray: '#7F7F7F',
  orange: '#FFC83A',
  lightOrange: '#ffcd50',
  blue: '#5278da99',
  oceanBlue: '#0077d7',
  green: '#00ae0099',
  yellow: '#f8cc5e',
  dashColor: '#747474',
};

const theme = {
  ...colors,
  colors,

  mobile: `(max-width: ${size.xsmall})`,
  bigmobile: `(max-width: ${size.small})`,
  tablet: `(max-width: ${size.medium})`,
  laptop: `(max-width: 1440px)`,
  desktop: `(max-width: ${size.large})`,
};


const GlobalStyle = createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    cursor: pointer;
  }
  `;
export { theme, GlobalStyle };
