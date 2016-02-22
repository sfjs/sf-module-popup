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

    this.data = {};

    this.els = {
        node: node,
        modal: document.createElement("div"),
        backdrop: document.createElement("div"),
        template: document.querySelector(this.options.templateSelector)
    };

    this.modalReady = false;

    this.pattern = /\${.*?(?=})}/;
    this.matches = [];

    if (!this.options.data && !this.options.url) console.warn('No data or URL to fetch data provided');
    if (!this.options.templateSelector) console.warn('No template selector provided');
    if (!this.els.template && this.options.templateSelector) console.warn('No template found with provided selector');


    this.els.modal.classList.add('sf-popup-modal');
    this.els.backdrop.classList.add('sf-popup-backdrop');

    this.addEventListeners();
};

Popup.prototype.optionsToGrab =
{
    /**
     * URL to get data from <b>Default: false</b>
     */
    url: {
        value: false,
        domAttr: "data-url"
    },
    /**
     * Object name with Data fetched from server with data-url <b>Default: data</b>
     */
    responseDataName: {
        value: "data",
        domAttr: "data-response-data-name"
    },
    /**
     *  Pass data in JSON-encoded format <b>Default: false</b>
     */
    data: {
        value: false,
        domAttr: "data-data",
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
     *  Template selector to search in document <b>Default: false</b>
     */
    templateSelector: {
        value: false,
        domAttr: "data-template"
    }

};

Popup.prototype.deepObjectValue = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

Popup.prototype.parseTemplate = function () {
    var match, that = this, variable, template = this.els.template.innerHTML;

    while (match = this.pattern.exec(template)){
        variable = match[0].substring(2, match[0].length - 1);
        this.matches.push(variable);
        template = template.replace(match[0], that.deepObjectValue(that.data, variable) || ""); //if there is no value, then ""
    }

    this.els.modal.innerHTML = template;
    this.modalReady = true;
    this.openPopup();
};

Popup.prototype.generatePopup = function () {
    if (this.modalReady) {
        this.openPopup();
    } else {
        this.fetchData();
    }
};

Popup.prototype.fetchData = function () {
    var that = this;
    if (this.els.template) {
        if (this.options.url) {
            sf.ajax.send({
                url: this.options.url
            }).then(function (answer) {
                Object.assign(that.data, answer[that.options.responseDataName], that.options.data);
                that.parseTemplate();
            }, function (error) {
                console.warn('Error has occured during fetching data from given URL');
                return error;
            });
        } else {
            Object.assign(that.data, that.options.data);
            this.parseTemplate();
        }
    }
};

Popup.prototype.openPopup = function () {
    var that = this;
    document.body.appendChild(this.els.modal);
    document.body.appendChild(this.els.backdrop);
    setTimeout(function(){
        that.els.modal.classList.add('visible');
        that.els.backdrop.classList.add('visible');
    }, 0);
};

Popup.prototype.closePopup = function () {
    var that = this;
    this.els.modal.classList.remove('visible');
    this.els.backdrop.classList.remove('visible');

    setTimeout(function(){
        that.els.modal.parentNode.removeChild(that.els.modal);
        that.els.backdrop.parentNode.removeChild(that.els.backdrop);
    }, 300);

};

/**
 * Adds static events listeners.
 */
Popup.prototype.addEventListeners = function () {
    var that = this;

    this._generatePopup = function(){
        that.generatePopup();
    };
    this._closePopup = function(){
        that.closePopup();
    };

    if (this.els.node) {
        this.els.node.addEventListener('click', this._generatePopup);
    }
    if (this.els.backdrop) {
        this.els.backdrop.addEventListener("click", this._closePopup);
    }
};

Popup.prototype.removeEventListeners = function () {
    if (this.els.node) {
        this.els.node.removeEventListener('change', this._generatePopup);
    }
    if (this.els.backdrop) {
        this.els.backdrop.removeEventListener("click", this._closePopup);
    }
};


Popup.prototype.die = function () {
    this.removeEventListeners();
    delete this;
};

module.exports = Popup;