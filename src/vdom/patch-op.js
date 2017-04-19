/**
 * @file 更新真实dom
 * Created by swxy on 2017/4/12.
 */
import * as CONSTANTS from '../util/constant';
import render, {setProperties} from './create';

export default function applyPatch(vPatch, domNode) {
    const {type, patch, vNode} = vPatch;

    switch (type) {
        case CONSTANTS.REMOVE:
            remove(domNode);
            break;
        case CONSTANTS.INSERT:
            insert(domNode, patch);
            break;
        case CONSTANTS.VTEXT:
            textPatch(domNode, patch);
            break;
        case CONSTANTS.VNODE:
            nodePatch(domNode, patch);
            break;
        case CONSTANTS.PROPS:
            setProperties(domNode, patch);
            break;
    }
}

function remove(domNode) {
    let parentNode = domNode.parentNode;
    if (parentNode) {
        parentNode.removeChild(domNode);
    }
}

function insert(domNode, patch) {
    const newNode = render(patch);
    if (domNode) {
        domNode.appendChild(newNode);
    }
}

function textPatch(domNode, vText) {
    if (domNode.type === 3) {
        domNode.replaceData(0, domNode.length, vText.text);
    }
    else {
        let parentNode = domNode.parentNode;
        if (parentNode) {
            parentNode.replaceChild(render(vText), domNode);
        }
    }
}

function nodePatch(domNode, vNode) {
    let parentNode = domNode.parentNode;
    if (parentNode) {
        parentNode.replaceChild(render(vNode), domNode);
    }
}