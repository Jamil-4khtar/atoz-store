import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import './index.css'
import './styles/ui-enhancements.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { SocketProvider } from './context/SocketContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </SocketProvider>
  </Provider>
)
