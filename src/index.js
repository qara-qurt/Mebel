import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store'
import reportWebVitals from './reportWebVitals';
import {Provider as AlertProvider} from 'react-alert'
import {AlertTemplate, options} from './alert'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
