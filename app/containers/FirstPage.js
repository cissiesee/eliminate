import React from 'react';
import { connect } from 'react-redux';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import * as ItemsActions from '../actions';
import { bindActionCreators } from 'redux';
import { Link, hashHistory } from 'react-router';
import EliminateContainer from '../components/EliminateContainer';
 
let FirstPage = React.createClass({
	mixins: [ImmutableRenderMixin],
	propTypes: {
		items: React.PropTypes.object,
		filter: React.PropTypes.string
	},
	render() {
		//console.log('context:', this.context);
		const actions = this.props.actions;
		return (
			<div>
				<h2>Eliminate JS</h2>
				<EliminateContainer items={this.props.items} dragItem={actions.dragItem}/>
			</div>
		);
	},
	toNextPage() {
		hashHistory.push('/second');
	}
});

export default connect(state => ({
	items: state.items
}), dispatch => ({
	actions: bindActionCreators(ItemsActions, dispatch)
}))(FirstPage);