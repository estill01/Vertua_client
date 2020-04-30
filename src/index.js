import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css'; // TailwindCSS overrides
import 'semantic-ui-css/semantic.min.css'
import App from './components/app';
import * as serviceWorker from './service_workers/serviceWorker';

console.log("### CONFIGS ##")
console.log("process.env", process.env)
console.log("REACT_APP_FIREBASE_PROJECT_ID: ", process.env.REACT_APP_FIREBASE_PROJECT_ID)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
