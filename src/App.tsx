import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'store';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Provider store={store}>
        <Routes />
      </Provider>
    </Router>
  );
};

export default App;
