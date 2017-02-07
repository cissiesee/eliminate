import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import EliminateElement from './EliminateElement';

require('../styles/element.less');
require('../styles/animation.less');

let swapDuration = 200, eliminateDuration = 200, dropDownDuration = 300;

let EliminateContainer = React.createClass({
	componentDidMount() {
		//this.checkEliminate();
	},
	componentWillUpdate() {
		clearTimeout(this.eliminateTimer);
		clearTimeout(this.dropElementsTimer);
	},
	componentDidUpdate() {
		switch(this.props.itemsInfo.get('status')) {
		case 'dragged':
			this.checkEliminate(swapDuration);
			break;
		case 'dropped':
			this.checkEliminate(dropDownDuration);
			break;
		case 'eliminated':
			this.dropElementsAfterCheck();
			break;
		}
	},
	render() {
		let itemsInfo = this.props.itemsInfo,
			items = itemsInfo.get('items');

		let actions = this.props.actions;

		return (
			<ul className="eleminate-container"
				onTouchEnd={this.stopDrag}
				//onMouseLeave={this.stopDrag}
				style={{width: itemsInfo.get("itemColNum") * itemsInfo.get("square"), height: itemsInfo.get("itemRowNum") * itemsInfo.get("square")}}>
				<ReactCSSTransitionGroup
	                transitionName="elementShow"
	                transitionEnterTimeout={eliminateDuration}
	                transitionLeaveTimeout={eliminateDuration}
	                component="div">
					{items.map(item => <EliminateElement
						item={item}
						draggingItem={itemsInfo.get('dragItem')}
						key={item.id}
						id={item.id}
						swapDuration={swapDuration}
						eliminateDuration={eliminateDuration}
						dropDownDuration={dropDownDuration}
						selectItem={actions.selectItem}
						dragItem={actions.dragItem}
						dragOverItem={actions.dragOverItem}
						status={itemsInfo.get('status')}
					/>)}
				</ReactCSSTransitionGroup>
			</ul>
		);
	},
	checkEliminate(duration) {
		let actions = this.props.actions;
		this.eliminateTimer = setTimeout(()=>{
			actions.deleteItems();
		}, duration);
	},
	dropElementsAfterCheck() {
		let actions = this.props.actions;
		this.dropElementsTimer = setTimeout(()=>{
			actions.dropdownItems();
		}, eliminateDuration);
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