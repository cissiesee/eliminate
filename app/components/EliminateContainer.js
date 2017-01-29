import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import EliminateElement from './EliminateElement';

require('../styles/element.less');
require('../styles/animation.less');

let EliminateContainer = React.createClass({
	componentDidMount() {
		//this.checkEliminate();
	},
	componentDidUpdate() {
		this.checkEliminate();
	},
	render() {
		let itemsInfo = this.props.itemsInfo,
			items = itemsInfo.get('items');

		return (
			<ul className="eleminate-container"
				onMouseDown={this.mouseDownHandler}
				onMouseMove={this.mouseMoveHandler}
				onMouseUp={this.stopDrag}
				onMouseLeave={this.stopDrag}
				style={{width: itemsInfo.get("itemColNum") * itemsInfo.get("square"), height: itemsInfo.get("itemRowNum") * itemsInfo.get("square")}}>
				<ReactCSSTransitionGroup
	                transitionName="elementShow"
	                transitionEnterTimeout={300}
	                transitionLeaveTimeout={300}
	                component="div">
					{items.map(item => <EliminateElement
						item={item} key={item.id} id={item.id}
						selectItem={this.props.selectItem}
						dragItem={this.props.dragItem}
						dragOverItem={this.props.dragOverItem}
						lock={itemsInfo.get('lock')}
					/>)}
				</ReactCSSTransitionGroup>
			</ul>
		);
	},
	checkEliminate() {
		if (this.props.itemsInfo.get('check')) {
			this.props.checkItems();
		}
	},
	mouseDownHandler() {
		// let mouseDownPosition = {
		// 	x:e.nativeEvent.clientX,
		// 	y:e.nativeEvent.clientY
		// };
		this.props.selectItem(this.props.item);
	},
	mouseMoveHandler() {
		//this.props.dragItem(this.props.item, e.nativeEvent);
		// if (this.mouseDownPosition) {
		// 	// let moveValues = {
		// 	// 	x: e.nativeEvent.clientX - this.mouseDownPosition.x,
		// 	// 	y: e.nativeEvent.clientY - this.mouseDownPosition.y
		// 	// };
		// 	// if (Math.sqrt(Math.pow(moveValues.x, 2) + Math.pow(moveValues.y, 2))) {
				
		// 	// }
		// 	this.props.dragItem(this.props.item, e.nativeEvent);
		// }
	},
	mouseUpHandler() {
		this.props.stopDrag(this.props.item);
	},
	stopDrag() {
		this.props.stopDrag(this.props.item);
	}
});

export default EliminateContainer;