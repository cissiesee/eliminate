import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import { Link } from 'react-router';

let SecondPage = React.createClass({
	render() {
		return (
			<div>
				<h3>second page</h3>
				<Link to='/third'>--下一页--</Link>
			</div>
		);
	}
});

export default SecondPage;