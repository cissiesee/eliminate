import React from 'react';
class EliminateElement extends React.Component {
	render() {
		var item = this.props.item;
		return (
			<div className="eleminate-element"
				draggable="true"
				id={this.props.id}
				onDragStart={this.props.dragItem.bind(this, item)}
				style={{left: item.col * 22, top: item.row * 22, background: item.color}}>
				{item.text}
			</div>
		);
	}
};

export default EliminateElement;