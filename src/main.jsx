import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router'
import {PuntosProvider, CartasProvider} from "./context"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <PuntosProvider>
    <CartasProvider>

      <AppRouter />
    </CartasProvider>
    </PuntosProvider>
  </React.StrictMode>
)