import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import style from "./container.css";

export default class Container extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	componentWillMount() {
		document.body.style.margin = "0px";
		// 这是防止页面被拖拽
		document.body.addEventListener('touchmove', (ev) => {
			ev.preventDefault();
		});
	}
	render() {
		//console.log(style.transitionWrapper);
		return (
			<ReactCSSTransitionGroup
                transitionName="transitionWrapper"
                component="div"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={1000}>
                <div key={this.props.location.pathname}
                    style={{position:"absolute", width: "100%"}}>
                    {
                        this.props.children
                    }
                </div>
            </ReactCSSTransitionGroup>
		);
	}
}