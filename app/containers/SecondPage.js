import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

let SecondPage = React.createClass({
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="example" className="example" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				<div>
					<h3>second page</h3>
					<Link to='/third'>下一页</Link>
				</div>
	        </ReactCSSTransitionGroup>
		);
	}
});

export default SecondPage;