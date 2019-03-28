import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Grommet } from 'grommet';
import { BrowserRouter } from 'react-router-dom';
// import theme from './utils/theme-grommet';

// const theme = {
//   global: {
//     font: {
//     family: 'Roboto',
//     size: '14px',
//     height: '20px',
//     color: 'green'
//     }
//   }
// }


ReactDOM.render(
  <BrowserRouter>
    <Grommet  plain>
      <App />
    </Grommet>
  </BrowserRouter>,
 document.getElementById('root'));
serviceWorker.unregister();
