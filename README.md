# sf-module-popup

Popup module

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
* **data-data** - Pass data in JSON-encoded format *Default: false*
* **data-template** - Template selector to search in document *Default: false*
* **data-delimiters** - Delimiters to parse variables in template *Default: "{{,}}"*
* **data-response-data-name** - Object name with Data fetched from server with data-url *Default: "data"*

## Local Development

### Installation

    npm install -g gulp
    npm install

### Building

    gulp build


## License

Copyright (c) 2016 Yauheni Yasinau. Released under an [MIT license](https://github.com/sfjs/sf-module-popup/blob/master/LICENSE).
