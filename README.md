# angular-smart-chartist ![](http://img.shields.io/badge/bower_module-v1.3.0-green.svg) #
======================

A handy direcitve for chartist, by which developer can build up their application with a beautiful chart in it


## Requirements ##

- [angular][angular-url]
- [chartist][chartist-url]


## Install ##

```powershell
bower install chartist --save
bower install angular-smart-chartist --save
```

## Import ##

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>DEMO</title>
    <link rel="stylesheet" type="text/css" href="path/chartist/libdist/chartist.min.css">
    <link rel="stylesheet" type="text/css" href="path/angular-smart-chartist/dist/angular-smart-chartist.css">
</head>
<body>
    <script type="text/javascript" src="path/chartist/libdist/chartist.min..js"></script>
    <script type="text/javascript" src="path/angular/angular.min.js"></script>
<script type="text/javascript" src="path/angular-smart-chartist/dist/angular-smart-chartist.min.js"></script>
</body>
</html>
```



## Usage ##

```html
<chartist tooltip="lineTooltip" class="ct-chart ct-minor-seventh" type="Bar" data="barData" options="barOpts"></chartist>
```

```javascript

var demo = angular.module('demo', ['angular-smart-chartist']);

demo.controller('DemoController', function($scope) {

    $scope.barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
    };

    $scope.barOpts = {
        seriesBarDistance: 10
    };

});
```

## API ##

| Attribute        | Type           | Required  | Description |
| :------------- |:-------------| :-----:| :-----|
| tooltip | boolean([expression]) | No | evaluaed as true to display the tooltip |
| class | string | No | Check the [chartist][chartist-url]'s doc: [Show available aspect ratios][css-url] |
| type | string | No | Chart method, `Bar`, `Line`, `Pie` are available. `Line` by default |
| data | object([expression]) | Yes | Check the [chartist][chartist-url]'s doc: [API][[api-url]] |
| options | object([expression]) | No | Check the [chartist][chartist-url]'s doc: [API][[api-url]] |
| responsive-options | array([expression]) | No | Check the [chartist][chartist-url]'s doc: [API][[api-url]] |


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular-smart-chartist/master/LICENSE)


[angular-url]: https://angularjs.org/
[chartist-url]: http://gionkunz.github.io/chartist-js/
[expression]: https://docs.angularjs.org/guide/expression
[css-url]: http://gionkunz.github.io/chartist-js/getting-started.html#container-aspect-ratio-classes
[api-url]: http://gionkunz.github.io/chartist-js/api-documentation.html