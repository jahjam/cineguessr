import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { InputContextProvider } from './store/input-context';
import { GameContextProvider } from './store/game-context';
import { KeyDownContextProvider } from './store/key-down-context';
import { AlertContextProvider } from './store/alert-context';
// import { AuthContextProvider } from './store/auth-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/*<AuthContextProvider>*/}
      <AlertContextProvider>
        <GameContextProvider>
          <InputContextProvider>
            <KeyDownContextProvider>
              <App />
            </KeyDownContextProvider>
          </InputContextProvider>
        </GameContextProvider>
      </AlertContextProvider>
    {/*</AuthContextProvider>*/}
  </React.StrictMode>
);
