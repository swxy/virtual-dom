/**
 * @file
 * Created by swxy on 2017/4/11.
 */
import {version, vpatch} from '../util/constant';

export default class VPatch{
    constructor(type, vNode, patch) {
        this.type = +type;
        this.vnode = vNode;
        this.patch = patch;
    }
}

VPatch.prototype.version = version;
VPatch.prototype.type = vpatch;