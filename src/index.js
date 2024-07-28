import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';



// Initialize Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
