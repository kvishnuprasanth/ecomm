import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './swiperComponent.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './store/index.js'
import {Provider} from 'react-redux'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
