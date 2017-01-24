import React from 'react';
class EliminateElement extends React.Component {
	render() {
		var item = this.props.item;
		return (
			<div className="eleminate-element"
				id={this.props.id}
				draggable="true"
				onMouseDown={this.props.selectItem.bind(this, item)}
				onDragStart={this.dragStartHandler}
				onMouseEnter={this.mouseEnterHandler}
				style={{
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
		this.props.dragItem(this.props.item);
	}
	mouseEnterHandler=(e)=>{
		this.props.dragOverItem(this.props.item);
	}
};

export default EliminateElement;