import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Grommet } from 'grommet';
import customTheme from './utils/theme-grommet'
import { BrowserRouter } from 'react-router-dom';
import 'moment-timezone';
import $ from 'jquery';

import { SearchStore } from '../src/context/SearchStore';

$(function () {
  $('[data-toggle="popover"]').popover()
})


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
