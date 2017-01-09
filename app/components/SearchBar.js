import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

let SearchBar = React.createClass({
    contextTypes: {
        store: React.PropTypes.object
    },
    mixins: [ImmutableRenderMixin],
    getInitialState: function() {
        return {test: 1};
    },
    clickHandler: function(e) {
        this.setState({test: 2});
    },
    render() {
    	//let items = this.context.store.getState().items.toArray();
    	//console.log(this.state);
        return (
            <div className="pure-form">
                <input type="text" onKeyUp={this.props.filterItem} onClick={this.clickHandler} placeholder="请输入查找的item" />
            </div>
        )
    }
})

export default SearchBar;