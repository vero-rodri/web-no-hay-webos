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
import 'moment-timezone';

import { SearchStore } from '../src/context/SearchStore';


ReactDOM.render(
  <BrowserRouter>
    <SearchStore>
      <Grommet  theme={customTheme}>
        <App />
      </Grommet>
    </SearchStore>
  </BrowserRouter>,
 document.getElementById('root'));
serviceWorker.unregister();
