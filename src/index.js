import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Grommet } from 'grommet';
import customTheme from './utils/theme-grommet'
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  <BrowserRouter>
    <Grommet  theme={customTheme}>
      <App />
    </Grommet>
  </BrowserRouter>,
 document.getElementById('root'));
serviceWorker.unregister();
