import React from 'react';
import DomUtils from '../utils/DomUtils';

//console.log('element style:', style);
class EliminateElement extends React.Component {
    render() {
        let item = this.props.item;
        return (
            <div className="eleminate-element"
                id={this.props.id}
                onClick={this.props.selectItem.bind(this, item)}
                onTouchStart={this.touchStartHandler}
                onTouchMove={this.touchMoveHandler}
                style={{
                    transition: this.getTransition(this.props.status),
                    transform: `translate(${item.col * item.square}px, ${item.row * item.square}px)`,
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
    getTransition(status) {
        let swapDuration = this.props.swapDuration,
            eliminateDuration = this.props.eliminateDuration,
            dropDownDuration = this.props.dropDownDuration;

        let dropDelay = (this.props.item.dropDelay || 0) * 10;

        let transitionStr = `opacity ${eliminateDuration}ms ease-out`;

        switch(status) {
        case 'dragged':
            return `${transitionStr}, transform ${swapDuration}ms ease-in`;
        case 'dropped':
            return `${transitionStr}, transform ${dropDownDuration}ms cubic-bezier(1, 0.005, 0.620, 1.240) ${dropDelay}ms`;
        default:
            return transitionStr;
        }
    }
    touchStartHandler=(e)=>{
        if (this.props.status === 'none') {
            let event = e.nativeEvent, targetTouches = event.targetTouches;
            let touchItem = Object.assign({}, this.props.item);
            let position = DomUtils.getAbsEleClientPostion(event.target, {
                x: touchItem.col * touchItem.square,
                y: touchItem.row * touchItem.square
            });
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