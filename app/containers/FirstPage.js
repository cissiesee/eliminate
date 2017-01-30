import React from 'react';
import { connect } from 'react-redux';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import { bindActionCreators } from 'redux';
import { Link, hashHistory } from 'react-router';

import * as ItemsActions from '../actions/ItemsAction'; //action
import EliminateContainer from '../components/EliminateContainer'; //root component
 
let FirstPage = React.createClass({
	mixins: [ImmutableRenderMixin],
	propTypes: {
		itemsInfo: React.PropTypes.object,
		filter: React.PropTypes.string
	},
	render() {
		//console.log('context:', this.context);
		const actions = this.props.actions;
		let itemsInfo = this.props.itemsInfo;
		return (
			<div>
				<h2>Eliminate JS</h2>
				<EliminateContainer
					itemsInfo={itemsInfo}
					selectItem={actions.selectItem}
					swapItems={actions.swapItems}
					dragItem={actions.dragItem}
					dragOverItem={actions.dragOverItem}
					stopDrag={actions.stopDrag}
					checkItems={actions.checkItems}
				/>
			</div>
		);
	},
	toNextPage() {
		hashHistory.push('/second');
	}
});

export default connect(state => ({
	itemsInfo: state.itemsInfo
}), dispatch => ({
	actions: bindActionCreators(ItemsActions, dispatch)
}))(FirstPage);