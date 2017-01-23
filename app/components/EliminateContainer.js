import React, { Component } from 'react';
//import _ from 'lodash';
//import classNames from 'classnames';
import EliminateElement from './EliminateElement';

require('../styles/ui.less');

//console.log(css);

class EliminateContainer extends Component {
	render() {
		let items = this.props.items.toArray();

		return (
			<ul className="eleminate-container">
				{items.map(item => <EliminateElement item={item} key={item.id} id={item.id} dragItem={this.props.dragItem} />)}
			</ul>
		);
	}
}

export default EliminateContainer;