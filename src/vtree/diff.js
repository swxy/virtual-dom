/**
 * @file diff 比较新旧树
 * Created by swxy on 2017/4/11.
 */
import {isArray, isVText, isVNode} from '../util';
import VPatch from './vpatch';
import * as CONSTANT from '../util/constant';

export default function diff(a, b) {
    const patch = {a};
    walk(a, b, patch, 0);
    return patch;
}

function walk(a, b, patch, index) {
    let apply = patch[index];

    if (b === null) {
        apply = appendPatch(apply, new VPatch(CONSTANT.REMOVE, a, b));
    }
    else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName) {
                //
            }
            else {
                apply = appendPatch(apply, new VPatch(CONSTANT.VNODE, a, b));
            }
            apply = diffChildren(a, b, patch, apply, index);
        }
        else {
            apply = appendPatch(apply, new VPatch(CONSTANT.VNODE, a, b));
        }
    }
    else if (isVText(b)) {
        apply = appendPatch(apply, new VPatch(CONSTANT.VTEXT, a, b));
    }

    if (apply) {
        patch[index] = apply;
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch);
        }
        else {
            apply = [apply, patch];
        }
        return apply
    }
    else {
        return patch;
    }
}

function diffChildren(a, b, patch, apply, index) {
    const aChildren = a.children;
    const bChildren = b.children;
    const len = Math.max(aChildren.length, bChildren.length);
    for (let i = 0; i < len; i++) {
        let leftNode = aChildren[i];
        let rightNode = bChildren[i];
        index += 1;

        if (!leftNode) {
            if (rightNode) {
                apply = appendPatch(apply, new VPatch(CONSTANT.INSERT, null, rightNode));
            }
        }
        else if (!rightNode) {
            if (leftNode) {
                apply = appendPatch(apply, new VPatch(CONSTANT.REMOVE, null, rightNode));
            }
        }
        else {
            walk(leftNode, rightNode, patch, index);
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count;
        }
    }

    return apply;
}
