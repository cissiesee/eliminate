import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

let SearchBar = React.createClass({
	contextTypes: {
		store: React.PropTypes.object
	},
    //mixins: [ImmutableRenderMixin],
    render() {
    	let items = this.context.store.getState().items.toArray();
    	//console.log(this.state);
        return (
            <div className="pure-form">
            	<span>{items.length}</span>
                <input type="text" onKeyUp={this.props.filterItem} placeholder="请输入查找的item" />
            </div>
        )
    }
})

export default SearchBar;