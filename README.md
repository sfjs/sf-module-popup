# Popup module for sf.js

## Usage Example
```html
<div class="js-sf-popup" data-template="#template" data-data='{"name":"Lorem"}'>
    Open Popup
</div>
<script type="text/x-handlebars-template" id="template">
    <h1>{{name}} Ipsum</h1>
</script>
```

## Options
* **data-url** - URL to get data form *Default: false*
* **data-template-url** - URL to get template form *Default: false*
* **data-data** - Pass data in JSON-encoded format *Default: false*
* **data-template** - Template selector to search in document *Default: false*
* **data-delimiters** - Delimiters to parse variables in template *Default: "{{,}}"*
* **data-response-data-name** - Object name with Data fetched from server with data-url *Default: "data"*
* **data-response-template-name** - Object name with template fetched from server with data-url *Default: "template"*
 
## Events
* **show** - is being triggered on each popup opening
* **hide** - is being triggered on each popup closing
 
#### Usage Example
```javascript
    var popup = sf.addInstance("popup", document.getElementById('js-custom-popup'));

    popup.events.on("show", function (options) {
        ...
    });
    popup.events.on("hide", function (options) {
        ...
    });
```

## Methods
* **getContentNode** - returns modal-node where content is meant to be passed
 
#### Usage Example
```javascript
    var popup = sf.addInstance("popup", document.getElementById('js-custom-popup'));

    popup.getContentNode().innerHTML="<h1>Hello, World!</h1>";
```
 



## Local Development

### Installation

    npm install -g gulp
    npm install

### Building

    gulp build


## License

Copyright (c) 2016 Yauheni Yasinau. Released under an [MIT license](https://github.com/sfjs/sf-module-popup/blob/master/LICENSE).
