import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './configureStore';

const store = configureStore();

ReactDom.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('app'));