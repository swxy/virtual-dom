"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = domIndex;
/**
 * 真实dom和虚拟dom的映射关系
 *
 * Created by swxy on 2017/4/12.
 */

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || !indices.length) {
        return {};
    }
    indices = indices.sort(function (a, b) {
        return a > b;
    });
    return recurse(rootNode, tree, indices, nodes, 0);
}

function recurse(rootNode, tree, indices) {
    var nodes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var rootIndex = arguments[4];

    if (!rootNode) {
        return nodes;
    }
    if (indexInRange(indices, rootIndex, rootIndex)) {
        nodes[rootIndex] = rootNode;
    }

    var vChildren = tree.children;
    if (vChildren) {
        // 真实的dom节点
        var childNodes = rootNode.childNodes;
        for (var i = 0; i < vChildren.length; i++) {
            var vChild = vChildren[i] || {};
            rootIndex += 1;
            var nextIndex = rootIndex + (vChild.children && vChild.children.length || 0);

            // 如果此次有子节点的话，递归遍历子节点
            if (indexInRange(indices, rootIndex, nextIndex)) {
                recurse(childNodes[i], vChild, indices, nodes, rootIndex);
            }
            rootIndex = nextIndex;
        }
    }
    return nodes;
}

// 使用二分搜索indices数组中的值是否有在 left和right 区间内的
// 其实最简单可以直接使用 es5 array.some方法
// 此次应该是考虑性能问题。
function indexInRange(indices, left, right) {
    // return indices.some(k => k >= left && k <= right);
    if (!indices.length) {
        return false;
    }
    var minIndex = 0;
    var maxIndex = indices.length - 1;
    var middleIndex = void 0;
    var value = void 0;

    while (minIndex <= maxIndex) {
        middleIndex = Math.floor((minIndex + maxIndex) / 2); // 3.5 => 3
        value = indices[middleIndex];

        // 中间值的时候
        if (minIndex === maxIndex) {
            return value >= left && value <= right;
        }
        // 如果当前值在区间的左侧，游标向右边移动。
        else if (value < left) {
                minIndex = middleIndex + 1;
            }
            // 如果当前值在区间的右侧，游标向左边移动
            else if (value > right) {
                    maxIndex = middleIndex - 1;
                }
                // 当前值正好在区间内
                else {
                        return true;
                    }
    }
    return false;
}