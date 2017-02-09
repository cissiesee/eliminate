import React from 'react';
import { findDOMNode } from 'react-dom';
import DomUtils from '../utils/DomUtils';

let offset = 1;

//console.log('element style:', style);
class EliminateElement extends React.Component {
    // componentDidMount() {
    //     this.updateTransform();
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     this.updateTransform();
    // }
    render() {
        let item = this.props.item;
        //let square = item.square - offset * 2;
        return (
            <div className="eleminate-element"
                id={this.props.id}
                onClick={this.props.selectItem.bind(this, item)}
                onTouchStart={this.touchStartHandler}
                onTouchMove={this.touchMoveHandler}
                style={{
                    transition: 'all 300ms ease-out',//this.getTransition(this.props.status),
                    transform: `translate(${item.col * item.square}px, ${item.row * item.square}px)`,
                    background: item.backgroundColor,
                    color: item.fontColor,
                    borderRadius: item.square / 2,
                    width: item.square,
                    height: item.square,
                    lineHeight: item.square + 'px'
                }}>
                {item.text}
            </div>
        );
    }
    getTransition(status) {
        let item = this.props.item,
            swapDuration = this.props.swapDuration,
            eliminateDuration = this.props.eliminateDuration,
            dropDelayTime = this.props.dropDelayTime,
            dropDownDuration = this.props.dropDownDurationPerGrid * (item.dropdownRows || 0);

        let dropDelay = (this.props.item.dropDelay || 0) * dropDelayTime;

        let transitionStr = `all ${eliminateDuration}ms ease-out`;

        switch(status) {
        case 'dropped':
            return `transform ${dropDownDuration}ms cubic-bezier(1, 0.005, 0.620, 1.240) ${dropDelay}ms`;
        default:
            return transitionStr;
        }
    }
    updateTransform(delay) {
        let item = this.props.item;
        setTimeout(()=>{
            let dom = findDOMNode(this);
            dom.style.transform = `translate(${item.col * item.square}px, ${item.row * item.square}px)`;
        }, delay || 100);
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