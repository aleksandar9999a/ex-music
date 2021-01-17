// Styles
import './styles';

// DI Dependency
import 'reflect-metadata';

// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Binding
import './services/Player';
import router from './services/Router';


// Render
ReactDOM.render(<App router={router} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
