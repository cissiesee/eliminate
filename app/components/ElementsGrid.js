import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";

let ElementsGrid = React.createClass({
    mixins: [ImmutableRenderMixin],
    render() {
        let colNum = this.props.colNum, rowNum = this.props.rowNum, square = this.props.square, grid = this.props.grid;
        let cells = grid.map(({row, col, coverLevel})=>{
            let borderWidth = '1px 0 0 1px', borderRightWidth='0px', borderBottomWidth='0px';
            if (col === colNum - 1) {
                borderRightWidth = '1px';
            }
            if (row === rowNum - 1) {
                borderBottomWidth = '1px';
            }
            return (<div key={row + '' + col}
                    className="eliminate-cell"
                    style={{
                        transform: `translate(${col * square}px, ${row * square}px)`,
                        width: square,
                        height: square,
                        borderWidth: borderWidth,
                        borderRightWidth: borderRightWidth,
                        borderBottomWidth: borderBottomWidth
                        // background: '#fff',
                        // opacity: coverLevel * 0.3
                    }}>
                </div>
            );
        });

        return (
            <div className="eliminate-grid">
               {cells}
            </div>
        );
    }
});

export default ElementsGrid;