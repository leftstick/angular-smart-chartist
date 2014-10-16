'use strict';
var demo = angular.module('demo', ['angular-smart-chartist']);

demo.controller('DemoController', function($scope, $timeout) {
    $scope.tooltipStatus = true;
    $scope.data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        series: [
        {
            name: 'Title1',
            data: [12, 9, 7, 8, 5]
        },{
            name: 'Title2',
            data: [2, 1, 3.5, 7, 3]
        },{
            name: 'Title3',
            data: [1, 3, 4, 5, 6]
        }]
    };

    // $timeout(function() {
    //     $scope.options = {
    //         axisY: {
    //             showLabel: false
    //         },
    //         width: 300,
    //         height: 200
    //     };
    // }, 5000);
});
