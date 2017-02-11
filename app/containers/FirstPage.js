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
        actions: React.PropTypes.object,
        filter: React.PropTypes.string
    },
    render() {
        let {actions, itemsInfo} = this.props;

        return (
            <EliminateContainer itemsInfo={itemsInfo} actions={actions}/>
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