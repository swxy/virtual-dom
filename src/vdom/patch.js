/**
 * @file 检测是否有数据变化，然后执行更新
 * Created by swxy on 2017/4/10.
 */
import domIndex from './dom-index';
import patchOp from './patch-op';
import {isArray} from '../util';

export default function patch(rootNode, patches) {
    // 获取patches的下标
    const indices = Object.keys(patches).filter(key => key !== 'a').map(key => +key);

    // 不需要更新
    if (!indices.length) {
        return rootNode
    }

    let index = domIndex(rootNode, patches.a, indices);

    for (let nodeIndex of indices) {
        applyPatch(index[nodeIndex], patches[nodeIndex]);
    }
}

function applyPatch(domNode, patchList) {
    if (!domNode) {
        return ;
    }
    if (isArray(patchList)) {
        for (let patch of patchList) {
            patchOp(patch, domNode);
        }
    }
    else {
        patchOp(patchList, domNode);
    }
}