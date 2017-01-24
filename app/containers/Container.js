import React from "react";
import ReactCSSTransitionGroup from "react/lib/ReactCSSTransitionGroup";
import ImmutableRenderMixin from 'react-immutable-render-mixin';

require('../styles/ui.less');

let Container = React.createClass({
	mixins: [ImmutableRenderMixin],
	componentWillMount() {
		document.body.style.margin = "0px";
		// 这是防止页面被拖拽
		document.body.addEventListener('touchmove', (ev) => {
			ev.preventDefault();
		});
		document.body.ondragover = (ev) => {
			ev.preventDefault();
		};
		document.body.ondragstart = (ev) => {
			ev.preventDefault();
		};
		document.body.onselect = (ev) => {
			ev.preventDefault();
		};
	},
	render() {
		//console.log(this.props.location.pathname, ',', this.props.location.action);
		let action = this.props.location.action;
		let transitionName = 'transitionWrapper' + (action === 'POP' ? '-back' : '');
		return (
			<ReactCSSTransitionGroup
                transitionName={transitionName}
                component="div"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname} className="ui-page">
                    {this.props.children}
                </div>
            </ReactCSSTransitionGroup>
		);
	}
});

export default Container;