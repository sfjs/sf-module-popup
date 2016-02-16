"use strict";
import sf from 'sf';//resolved by webpack's "externals"
import Popup from './popup';

require("style!css?minimize!less!./popup.less");

sf.instancesController.registerInstanceType(Popup, "js-sf-popup");
module.exports = Popup;   // ES6 default export will not expose us as global