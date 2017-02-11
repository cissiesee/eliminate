import React from 'react';
import { findDOMNode } from 'react-dom';
import DomUtils from '../utils/DomUtils';

let offset = 1;

//console.log('element style:', style);
class EliminateElement extends React.Component {
    // componentDidMount() {
    //     this.updateTransform();
    // }
    componentDidUpdate(prevProps, prevState) {
    	//计算中心位置
    	let item = this.props.item;
    	let square = this.props.square;
    	let dom = findDOMNode(this);
        let position = DomUtils.getAbsEleClientPostion(dom, {
            x: item.col * square,
            y: item.row * square
        });
        this.center = {x: position.x + square / 2, y: position.y + square / 2};
    }
    render() {
        let item = this.props.item;
        let square = this.props.square;
        //let square = item.square - offset * 2;
        return (
            <div className="eleminate-element"
                id={this.props.id}
                onClick={this.props.selectItem.bind(this, item)}
                onTouchStart={this.touchStartHandler}
                onTouchMove={this.touchMoveHandler}
                style={{
                    transition: `all ${this.props.animateDuration}ms ease-out`,//this.getTransition(this.props.status),
                    transform: `translate(${item.col * square}px, ${item.row * square}px)`,
                    background: item.backgroundColor,
                    color: item.fontColor,
                    borderRadius: square / 2,
                    width: square,
                    height: square,
                    lineHeight: square + 'px'
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
    touchStartHandler=(e)=>{
        if (this.props.status === 'none') {
            let item = this.props.item;
            this.props.dragItem(item);
        }
    }
    touchMoveHandler=(e)=>{
        if (this.props.status === 'dragging') {
            let item = this.props.item;
            let square = this.props.square;
            let event = e.nativeEvent, targetTouches = event.targetTouches;
            let position = targetTouches[0];

            let diffX = position.clientX - this.center.x, diffY = position.clientY - this.center.y;

            let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            let angle = Math.atan2(-diffY, diffX);

        	//console.log(distance, angle);

            if (distance > square / 2) {
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