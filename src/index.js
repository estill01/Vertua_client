import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css'; // TailwindCSS overrides
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import * as serviceWorker from './service_workers/serviceWorker';

import store from './redux/store'
import { bootAuth } from './redux/slices/FirebaseSlice.js'

// store.firebase.boot
console.log("$$ STORE DEV ##")
// async function boot() {
// 	await store.dispatch(bootFirebase())
// 	await store.dispatch(bootAuth())
// }
store.dispatch(bootAuth())


ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
