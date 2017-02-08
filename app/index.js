import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Container from './containers/Container';
import FirstPage from './containers/FirstPage';
import SecondPage from './containers/SecondPage';
import ThirdPage from './containers/ThirdPage';
import configureStore from './configureStore';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
//import { RouteTransition } from 'react-router-transition';

const store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Container}>
                <IndexRoute component={FirstPage} />
                <Route path="/index" component={FirstPage}/>
                <Route path="/second" component={SecondPage}/>
                <Route path="/third" component={ThirdPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'));