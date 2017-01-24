import React, { Component } from 'react';
//import _ from 'lodash';
//import classNames from 'classnames';
import EliminateElement from './EliminateElement';

//console.log(css);

class EliminateContainer extends Component {
	render() {
		let itemsInfo = this.props.itemsInfo,
			items = itemsInfo.get('items');

		return (
			<ul className="eleminate-container"
				onMouseDown={this.mouseDownHandler}
				onMouseMove={this.mouseMoveHandler}
				onMouseUp={this.stopDrag}
				onMouseLeave={this.stopDrag}
				style={{width: itemsInfo.get('itemColNum') * itemsInfo.get('square'), height: itemsInfo.get('itemRowNum') * itemsInfo.get('square')}}>
				{items.map(item => <EliminateElement
					item={item} key={item.id} id={item.id}
					selectItem={this.props.selectItem}
					dragItem={this.props.dragItem}
					dragOverItem={this.props.dragOverItem}
				/>)}
			</ul>
		);
	}
	mouseDownHandler=(e)=>{
		// let mouseDownPosition = {
		// 	x:e.nativeEvent.clientX,
		// 	y:e.nativeEvent.clientY
		// };
		this.props.selectItem(this.props.item, e.nativeEvent);
	}
	mouseMoveHandler=(e)=>{
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
	}
	mouseUpHandler=(e)=>{
		this.props.stopDrag(this.props.item);
	}
	stopDrag=(e)=>{
		this.props.stopDrag(this.props.item);
	}
}

export default EliminateContainer;