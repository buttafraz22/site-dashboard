import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import  DateProvider  from './contexts/date/DateProvider';
import AuthProvider from './contexts/auth/AuthProvider.jsx';
import { Provider } from 'react-redux';
import store from '../src/stores/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <DateProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      </DateProvider>
    </AuthProvider>
  </Provider>
)
