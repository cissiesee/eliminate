function getAbsEleClientPostion(dom) {
	let position = {x: dom.offsetLeft, y: dom.offsetTop};
	let offsetParent = dom.offsetParent;
	while(offsetParent) {
		position.x += offsetParent.offsetLeft;
		position.y += offsetParent.offsetTop;
		offsetParent = offsetParent.offsetParent;
	}
	return position;
}

export default {getAbsEleClientPostion};