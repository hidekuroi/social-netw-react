import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';


export let rerenderEntireTree = (reduxStore = store, state=store.getState(), dispatch = store.dispatch.bind(store)) => {
    ReactDOM.render(
      <React.StrictMode>
        <App state={state} store={reduxStore} dispatch={dispatch}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

  
rerenderEntireTree();

store.subscribe(() => {rerenderEntireTree()});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
