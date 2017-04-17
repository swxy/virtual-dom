/**
 * @file 更新真实dom
 * Created by swxy on 2017/4/12.
 */
import * as CONSTANTS from '../util/constant';
import render from './create';

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
            textPatch(domNode, vNode, patch);
            break;
        case CONSTANTS.VNODE:
            nodePatch(domNode, vNode, patch);
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

function textPatch(domNode, leftNode, vText) {
    if (domNode.type === 3) {
        domNode.replaceData(0, leftNode.length, vText.text);
    }
    else {
        let parentNode = domNode.parentNode;
        if (parentNode) {
            parentNode.replaceChild(leftNode, render(vText));
        }
    }
}

function nodePatch(domNode, leftNode, vNode) {
    let parentNode = domNode.parentNode;
    if (parentNode) {
        parentNode.replaceChild(leftNode, render(vNode));
    }
}