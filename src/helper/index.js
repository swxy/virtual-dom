/**
 * @file 辅助函数，用于表示dom节点结构
 * Created by swxy on 2017/4/10.
 */
require("babel-polyfill");

import {isArray, isString, isVNode, isVText} from '../util';
import VText from '../vtree/vtext';
import VNode from '../vtree/vnode';

function isChild(x) {
    return isVNode(x) || isVText(x);
}

function isChildren(x) {
    return isArray(x) || isString(x) || isChild(x);
}

/**
 * 简化操作，暂时不考虑标签属性的变化
 * @param tagName
 * @param props
 * @param children
 * @return {VNode}
 */
export default function (tagName, props, children) {
    // 简化传的参数
    if (!children) {
        if (isChildren(props)) {
            children = props;
            props = undefined;
        }
    }

    let childNodes = [];
    if (isArray(children)) {
        for (let child of children) {
            if (isString(child)) {
                childNodes.push(new VText(child));
            }
            else {
                childNodes.push(child);
            }
        }
    }
    else if (isString(children)) {
        childNodes = [new VText(children)];
    }

    return new VNode(tagName, props, childNodes);
}
