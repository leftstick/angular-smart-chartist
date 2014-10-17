'use strict';
var demo = angular.module('demo', ['angular-smart-chartist']);

demo.controller('DemoController', function($scope) {

    $scope.showSourceCode = false;

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

    $scope.lineTooltip = true;
    $scope.lineData = {
        labels: ['1', '2', '3', '4', '5', '6'],
        series: [{
            name: 'Fibonacci sequence',
            data: [1, 2, 3, 5, 8, 13]
        }, {
            name: 'Golden section',
            data: [1, 1.618, 2.618, 4.236, 6.854, 11.09]
        }]
    };


    $scope.pieData = {
        labels: ['Bananas', 'Apples', 'Grapes'],
        series: [20, 15, 40]
    };



    $scope.barSource = function() {
        $scope.showSourceCode = true;
        $scope.source = 'Bar';
    };

    $scope.lineSource = function() {
        $scope.showSourceCode = true;
        $scope.source = 'Line';
    };

    $scope.pieSource = function() {
        $scope.showSourceCode = true;
        $scope.source = 'Pie';
    };

    $scope.closeSource = function() {
        $scope.showSourceCode = false;
        delete $scope.source;
    };

});
