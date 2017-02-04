import React from 'react';
//console.log('element style:', style);
class EliminateElement extends React.Component {
	render() {
		var item = this.props.item;
		return (
			<div className="eleminate-element"
				id={this.props.id}
				onClick={this.props.selectItem.bind(this, item)}
				onTouchStart={this.dragStartHandler}
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
	dragStartHandler=(e)=>{
		if (this.props.status === 'none') {
			this.props.dragItem(this.props.item);
		}
	}
	touchMoveHandler=(e)=>{
		let draggingItem = this.props.draggingItem;
		let item = this.props.item;
		if (this.props.status === 'dragging' && draggingItem.id !== item.id) {
			this.props.dragOverItem(this.props.item);
		}
	}
};

export default EliminateElement;