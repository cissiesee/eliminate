import React from 'react';
import DomUtils from '../utils/DomUtils';

//console.log('element style:', style);
class EliminateElement extends React.Component {
	render() {
		var item = this.props.item;
		return (
			<div className="eleminate-element"
				id={this.props.id}
				onClick={this.props.selectItem.bind(this, item)}
				onTouchStart={this.touchStartHandler}
				onTouchMove={this.touchMoveHandler}
				style={{
					transition: 'all ' + (this.props.animateDuration || 300) + 'ms ease-out',
					left: item.col * item.square,
					top: item.row * item.square,
					background: item.backgroundColor,
					color: item.fontColor,
					width: item.square,
					height: item.square,
					lineHeight: item.square + 'px'
				}}>
				{item.text}
			</div>
		);
	}
	touchStartHandler=(e)=>{
		if (this.props.status === 'none') {
			let event = e.nativeEvent, targetTouches = event.targetTouches;
			let touchItem = Object.assign({}, this.props.item);
			let position = DomUtils.getAbsEleClientPostion(event.target);
			touchItem.center = {x: position.x + touchItem.square / 2, y: position.y + touchItem.square / 2};
			//touchItem.touchPosition = {x: targetTouches[0].clientX, y: targetTouches[0].clientY};
			this.props.dragItem(touchItem);
		}
	}
	touchMoveHandler=(e)=>{
		if (this.props.status === 'dragging') {
			let item = this.props.item;
			let event = e.nativeEvent, targetTouches = event.targetTouches;
			let position = targetTouches[0];
			let draggingItem = this.props.draggingItem, draggingItemCenter = draggingItem.center;

			let diffX = position.clientX - draggingItemCenter.x, diffY = position.clientY - draggingItemCenter.y;

			let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
			let angle = Math.atan2(-diffY, diffX);

			if (distance > item.square / 2) {
				//console.log(diffX, ',', -diffY, ',', angle);
				let dragOverItem = {row: item.row, col: item.col};
				if (angle > -Math.PI / 4 && angle < Math.PI / 4) { //to right
					dragOverItem.col = item.col + 1;
				} else if (angle > Math.PI / 4 && angle < Math.PI * 3 / 4) { //to top
					dragOverItem.row = item.row - 1;
				} else if ((angle > Math.PI * 3 / 4 && angle < Math.PI) || (angle > -Math.PI && angle < -Math.PI * 3 / 4)) { //to left
					dragOverItem.col = item.col - 1;
				} else if (angle > -Math.PI * 3 / 4 && angle < -Math.PI / 4) { //to bottom
					dragOverItem.row = item.row + 1;
				}
				//console.log(dragOverItem);
				this.props.dragOverItem(dragOverItem);
			}
		}
	}
};

export default EliminateElement;