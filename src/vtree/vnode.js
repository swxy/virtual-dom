/**
 * Created by swxy on 2017/4/10.
 */
import {vnode, version} from '../util/constant';
import {isVNode} from '../util';

export default class VNode {
    constructor(tagName, properties = {}, children = []) {
        this.tagName = tagName;
        this.properties = properties;
        this.children = children;

        // 计算有多少个子节点？
        let count = children.length || 0;
        let descendants = children.reduce((acc, child) => {
            if (isVNode(child)) {
                return acc + child.count;
            }
            return acc;
        }, 0);
        this.count = count + descendants;
    }
}

VNode.prototype.type = vnode;
VNode.prototype.version = version;