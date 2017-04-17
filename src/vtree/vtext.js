/**
 * Created by swxy on 2017/4/10.
 */

import {vtext, version} from '../util/constant';

export default class VText {
    constructor(text) {
        this.text = text;
    }
}
VText.prototype.type = vtext;
VText.prototype.version = version;