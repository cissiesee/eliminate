import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './configureStore';
 
const store = configureStore();
 
React.render(
    <div>
        <Provider store={store}>
            {() => <App /> }
        </Provider>
    </div>,
    document.getElementById('app'));