import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { SWRConfig } from 'swr';
import { store } from './app/store';
import './bootstrap';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
`;

const render = () => {
  const { App } = require('./app/App');

  ReactDOM.render(
    <Provider store={store}>
      <SWRConfig
        value={{
          refreshInterval: 0,
          refreshWhenHidden: false,
          refreshWhenOffline: false,
          shouldRetryOnError: false
        }}
      >
        <GlobalStyle />
        <App />
      </SWRConfig>
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}
