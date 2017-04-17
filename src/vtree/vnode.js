/**
 * Created by swxy on 2017/4/10.
 */
import {vnode, version} from '../util/constant';

export default class VNode {
    constructor(tagName, properties = {}, children = []) {
        this.tagName = tagName;
        this.properties = properties;
        this.children = children;
    }
}

VNode.prototype.type = vnode;
VNode.prototype.version = version;