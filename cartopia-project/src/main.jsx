
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { ThemeProvider } from '@emotion/react'
import CustomTheme from './CustomTheme.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={CustomTheme}>
  <Provider store ={store}>
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthProvider>
  </Provider>
  </ThemeProvider>
)
