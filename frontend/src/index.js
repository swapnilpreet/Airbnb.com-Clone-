import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { extendTheme } from "@chakra-ui/react";
import store from './Redux/store';

const theme = extendTheme({
  colors: {
    primary: {
      main: "#FF385C"
    },
    secondary: {
      main: "#eb7f7f"
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
            <App/>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);


reportWebVitals();
