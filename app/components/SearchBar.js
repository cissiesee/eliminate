import React, { Component } from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

class SearchBar extends Component {
	clickHandler = (e) => {
		console.log(e.target);
	}
	render() {
		//let items = this.context.store.getState().items.toArray();
		//console.log(this.state);
		return (
			<div className="pure-form">
				<input type="text" onKeyUp={this.props.filterItem} onClick={this.clickHandler} placeholder="请输入查找的item" />
			</div>
		);
	}
}

export default SearchBar;