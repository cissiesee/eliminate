import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import EliminateElement from './EliminateElement';

require('../styles/element.less');
require('../styles/animation.less');

let animateDuration = 300;

let EliminateContainer = React.createClass({
	componentDidMount() {
		//this.checkEliminate();
	},
	componentDidUpdate() {
		switch(this.props.itemsInfo.get('status')) {
		case 'dragged':
		case 'dropped':
			this.checkEliminate();
			break;
		case 'eliminated':
			this.dropElimentsAfterCheck();
			break;
		}
	},
	render() {
		let itemsInfo = this.props.itemsInfo,
			items = itemsInfo.get('items');

		let actions = this.props.actions;

		return (
			<ul className="eleminate-container"
				onMouseUp={this.stopDrag}
				onMouseLeave={this.stopDrag}
				style={{width: itemsInfo.get("itemColNum") * itemsInfo.get("square"), height: itemsInfo.get("itemRowNum") * itemsInfo.get("square")}}>
				<ReactCSSTransitionGroup
	                transitionName="elementShow"
	                transitionEnterTimeout={animateDuration}
	                transitionLeaveTimeout={animateDuration}
	                component="div">
					{items.map(item => <EliminateElement
						item={item}
						key={item.id}
						id={item.id}
						animateDuration={animateDuration}
						selectItem={actions.selectItem}
						dragItem={actions.dragItem}
						dragOverItem={actions.dragOverItem}
						status={itemsInfo.get('status')}
					/>)}
				</ReactCSSTransitionGroup>
			</ul>
		);
	},
	checkEliminate() {
		let actions = this.props.actions;
		setTimeout(()=>{
			actions.deleteItems();
		}, animateDuration);
	},
	dropElimentsAfterCheck() {
		let actions = this.props.actions;
		setTimeout(()=>{
			actions.dropdownItems();
		}, animateDuration);
	},
	// clearStatus() {
	// 	let actions = this.props.actions;
	// 	setTimeout(()=>{
	// 		actions.clearStatus();
	// 	}, animateDuration);
	// },
	mouseUpHandler() {
		let actions = this.props.actions;
		this.props.stopDrag();
	},
	stopDrag() {
		let actions = this.props.actions;
		actions.stopDrag();
	}
});

export default EliminateContainer;