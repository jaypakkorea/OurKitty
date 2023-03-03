/* eslint-disable react/jsx-filename-extension */
// import CreateDOM from 'react-dom/client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './styles/index';

import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./Store";
import './FontAwesome';


let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
                <GlobalStyle />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
