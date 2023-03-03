import { createGlobalStyle } from 'styled-components';
// 각 폰트 파일 import
import BMJUA from '../assets/fonts/BMJUA_ttf.woff';
import BMHANNAPro from '../assets/fonts/BMHANNAPro.woff';
import BMYEONSUNG from '../assets/fonts/BMYEONSUNG.woff';

export default createGlobalStyle`
    @font-face {
        font-family: "BMJUA";
        src: local("BMJUA"), url(${BMJUA}) format('woff'); 
    }
    @font-face {
        font-family: "BMHANNAPro";
        src: local("BMHANNAPro"), url(${BMHANNAPro}) format('woff'); 
    }
    @font-face {
        font-family: "BMYEONSUNG";
        src: local("BMYEONSUNG"), url(${BMYEONSUNG}) format('woff'); 
    }
`;