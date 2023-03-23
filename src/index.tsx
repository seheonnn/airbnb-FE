import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import theme from './theme';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// fetch한 모든 data가 QueryClient에 있음
const client = new QueryClient();


// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
// <React.StrictMode>
  <QueryClientProvider client={client}>
    <ChakraProvider theme={theme}> {/* 테마 확장 */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} /> {/* user가 이전에 다크모드였는지, 라이트모드였는지 확인 */}
    <RouterProvider router={router} />
    </ChakraProvider>
  </QueryClientProvider>
// </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
