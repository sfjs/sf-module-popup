"use strict";
import sf from 'sf';//resolved by webpack's "externals"

var Popup = function (sf, node, options) {
    this._construct(sf, node, options);
};

Popup.prototype = sf.createModulePrototype();

Popup.prototype.name = "popup";

Popup.prototype._construct = function (sf, node, options) {
    this.init(sf, node, options);//call parent

    if (options) {//if we pass options extend all options by passed options
        this.options = Object.assign(this.options, options);
    }

    if (!this.options.predefinedData && !this.options.dataURL) {
        console.warn('No data or URL to fetch data is passed');
    }
    if (!this.options.predefinedTemplate && !this.options.templateURL) {
        console.warn('No template or URL to fetch template is passed');
    }

    this.els = {
        node: node,
        modal: document.createElement("div"),
        backdrop: document.createElement("div")
    };

    this.els.modal.classList.add('sf-popup-modal');
    this.els.backdrop.classList.add('sf-popup-backdrop');

    this.addEventListeners();

};

Popup.prototype.optionsToGrab =
{
    /**
     * URL to get data from <b>Default: false</b>
     */
    dataURL: {
        value: false,
        domAttr: "data-data-url"
    },
    /**
     *  Pass data in JSON-encoded format <b>Default: false</b>
     */
    predefinedData: {
        value: false,
        domAttr: "data-predefined-data",
        processor: function (node, val, self) {
            if (!val) return this.value;
            if (typeof val == "string") {
                try {
                    val = JSON.parse(val);
                } catch (e) {
                    console.error("Popup data JSON.parse error: ", e);
                }
            }
            return Object.assign(self.value, val);
        }
    },
    /**
     *  Pass html template as data-attribute <b>Default: false</b>
     */
    predefinedTemplate: {
        value: false,
        key: "data-predefined-template"
    },
    /**
     *  URL to get template from <b>Default: false</b>
     */
    templateURL: {
        value: false,
        key: "data-template-url"
    }

};



Popup.prototype.generatePopup = function () {
    //todo fetch template & data and iterate then
    this.openPopup();
};

Popup.prototype.openPopup = function () {
    var that = this;
    document.body.appendChild(this.els.modal);
    document.body.appendChild(this.els.backdrop);
    setTimeout(function(){
        that.els.modal.classList.add('visible');
        that.els.backdrop.classList.add('visible');
    }, 0);
    this.addModalEventListeners();
    this.removeEventListeners();
};

Popup.prototype.closePopup = function () {
    var that = this;
    this.els.modal.classList.remove('visible');
    this.els.backdrop.classList.remove('visible');

    setTimeout(function(){
        that.els.modal.parentNode.removeChild(that.els.modal);
        that.els.backdrop.parentNode.removeChild(that.els.backdrop);
    }, 300);

    this.removeModalEventListeners();
    this.addEventListeners();
};

/**
 * Adds static events listeners.
 */
Popup.prototype.addEventListeners = function () {
    var that = this;

    this._generatePopup = function(){
        that.generatePopup();
    };

    if (this.els.node) {
        this.els.node.addEventListener('click', this._generatePopup);
    }
};

Popup.prototype.removeEventListeners = function () {
    if (this.els.node) {
        this.els.node.removeEventListener('change', this._generatePopup);
    }
};

/**
 * Adds events listeners for modal.
 */
Popup.prototype.addModalEventListeners = function () {
    var that = this;

    this._closePopup = function(){
        that.closePopup();
    };

    this.els.backdrop.addEventListener("click", this._closePopup);

};

Popup.prototype.removeModalEventListeners = function () {
    this.els.backdrop.removeEventListener("click", this._closePopup);
};

Popup.prototype.die = function () {
    this.removeEventListeners();
    this.removeModalEventListeners();
    delete this;
};

module.exports = Popup;