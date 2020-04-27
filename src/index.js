import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css'; // TailwindCSS overrides
import 'semantic-ui-css/semantic.min.css'
import store from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './service_workers/serviceWorker';
import { App } from './features/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
