import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import Container from './containers/Container';
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
				<IndexRoute component={App} />
				<Route path="/index" component={App}/>
				<Route path="/second" component={SecondPage}/>
				<Route path="/third" component={ThirdPage}/>
			</Route>
		</Router>
	</Provider>,
    document.getElementById('app'));