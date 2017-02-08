function getAbsEleClientPostion(dom, domPosition) {
    let position = domPosition || {x: dom.offsetLeft, y: dom.offsetTop};
    let offsetParent = dom.offsetParent;
    while(offsetParent) {
        position.x += offsetParent.offsetLeft;
        position.y += offsetParent.offsetTop;
        offsetParent = offsetParent.offsetParent;
    }
    return position;
}

function getTransformClientPostion(dom) {
    let transform = dom.style.transform;
    if (!transform) {
        console.error('dom should has transform style!');
    }
    let translateMatches = transform.match(/translate\((\d+)px,\s*(\d+)px\)/);
    return {
        x: translateMatches[1],
        y: translateMatches[2]
    };
}

export default {getAbsEleClientPostion, getTransformClientPostion};