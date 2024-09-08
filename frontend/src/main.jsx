import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import { Socketprovider } from './context/context';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Socketprovider>
        <App />
      </Socketprovider>      
    </BrowserRouter>    
  </StrictMode>,
)
