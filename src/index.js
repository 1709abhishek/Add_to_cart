import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyn8IOmTOcpPam9894Z7POoCsUhYdfXAI",
  authDomain: "cart-d4706.firebaseapp.com",
  databaseURL: "https://cart-d4706.firebaseio.com",
  projectId: "cart-d4706",
  storageBucket: "cart-d4706.appspot.com",
  messagingSenderId: "692370257515",
  appId: "1:692370257515:web:403829fc640f7e3623632e",
  measurementId: "G-ENKRSJZR5E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

