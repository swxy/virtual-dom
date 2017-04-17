/**
 * 真实dom和虚拟dom的映射关系
 *
 * Created by swxy on 2017/4/12.
 */

export default function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || !indices.length) {
        return {};
    }
    indices = indices.sort((a, b) => a > b);
    return recurse(rootNode, tree, indices, nodes, 0);
}

function recurse(rootNode, tree, indices, nodes = {}, rootIndex) {
    if (!rootNode) {
        return nodes;
    }
    if (indexInRange(indices, rootIndex, rootIndex)) {
        nodes[rootIndex] = rootNode;
    }

    const vChildren = tree.children;
    if (vChildren) {
        // 真实的dom节点
        const childNodes = rootNode.childNodes;
        for (let i = 0; i < vChildren.length; i++) {
            let vChild = vChildren[i] || {};
            rootIndex += 1;
            let nextIndex = rootIndex + (vChild.children && vChild.children.length || 0);

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
    let minIndex = 0;
    let maxIndex = indices.length - 1;
    let middleIndex;
    let value;

    while(minIndex <= maxIndex) {
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

