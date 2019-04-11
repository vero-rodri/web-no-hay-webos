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
import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import 'moment-timezone';
import { SearchStore } from '../src/context/SearchStore';
import { AuthStore } from './context/AuthStore';


ReactDOM.render(
  // <HashRouter>
     <BrowserRouter >
      <AuthStore>
        <SearchStore>
          <Grommet  theme={customTheme}>
            <App />
          </Grommet>
        </SearchStore>
      </AuthStore>
    </BrowserRouter>,
  // </HashRouter>,
 document.getElementById('root'));
serviceWorker.unregister();


{/* <HashRouter basename={process.env.PUBLIC_URL}>
 */}
