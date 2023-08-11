import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { Home } from './Component/Home';
import { BrowserRouter } from 'react-router-dom';
import store from './Component/stores/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        < Home />
        </BrowserRouter>
    </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
