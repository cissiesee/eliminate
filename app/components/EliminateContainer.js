import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

import ElementsGrid from './ElementsGrid';
import EliminateElement from './EliminateElement';

require('../styles/element.less');
require('../styles/animation.less');

let swapDuration = 200, eliminateDuration = 100, dropDownDurationPerGrid = 300, dropDelayTime = 10, animateDuration = 300;

let EliminateContainer = React.createClass({
    componentDidMount() {
        //this.checkEliminate();
    },
    componentWillUpdate() {
        clearTimeout(this.eliminateTimer);
        clearTimeout(this.dropElementsTimer);
    },
    componentDidUpdate() {
        let itemsInfo = this.props.itemsInfo;
        switch(itemsInfo.get('status')) {
        case 'dragged':
            this.checkEliminate(animateDuration);
            break;
        case 'dropped':
            this.checkEliminate(animateDuration);
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
            <div className="eleminate-container"
                onTouchEnd={this.stopDrag}
                //onMouseLeave={this.stopDrag}
                style={{width: itemsInfo.get('itemColNum') * itemsInfo.get('square'), height: itemsInfo.get('itemRowNum') * itemsInfo.get('square')}}>
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
                        dropDownDurationPerGrid={dropDownDurationPerGrid}
                        dropDelayTime={dropDelayTime}
                        animateDuration={animateDuration}
                        selectItem={actions.selectItem}
                        dragItem={actions.dragItem}
                        dragOverItem={actions.dragOverItem}
                        status={itemsInfo.get('status')}
                    />)}
                </ReactCSSTransitionGroup>
                <ElementsGrid
                    colNum={itemsInfo.get('itemColNum')}
                    rowNum={itemsInfo.get('itemRowNum')}
                    square={itemsInfo.get('square')}
                    grid={itemsInfo.get('grid')}
                />
            </div>
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
    //  let actions = this.props.actions;
    //  setTimeout(()=>{
    //      actions.clearStatus();
    //  }, animateDuration);
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