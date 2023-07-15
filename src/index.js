import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { store } from './store'
import { Provider } from 'react-redux'

import { App } from './components/app/App';
import "./style/_global.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</Provider>
);