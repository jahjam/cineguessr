import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { InputContextProvider } from './store/input-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InputContextProvider>
      <App />
    </InputContextProvider>
  </React.StrictMode>
);
