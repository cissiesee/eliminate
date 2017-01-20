import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import SecondPage from './containers/SecondPage';
import ThirdPage from './containers/ThirdPage';
import configureStore from './configureStore';
import { Router, Route, hashHistory } from 'react-router';

const store = configureStore();

ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}/>
			<Route path="/second" component={SecondPage}/>
			<Route path="/third" component={ThirdPage}/>
		</Router>
	</Provider>,
    document.getElementById('app'));