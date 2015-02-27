/**
 *
 *  Usage:
 *
 *       <chartist asc-tooltip="status" data="data" class="ct-chart ct-minor-seventh" options="options"></chartist>
 *
 *  @author Howard.Zuo
 *  @date Feb 27, 2015
 *
 **/
(function(global, angular, $) {
    'use strict';
    var definition = function(Chartist) {
        var chartTypes = ['Bar', 'Line', 'Pie'];

        var smart = angular.module('angular-smart-chartist', []);

        var dir = function() {
            return {
                restrict: 'AE',
                scope: {
                    type: '@',
                    ascTooltip: '=',
                    data: '=',
                    options: '=',
                    responsiveOptions: '='
                },
                link: function($scope, element) {
                    var originalStrokeWidth;
                    var chart;
                    var type = $scope.type || 'Line';
                    if (chartTypes.indexOf(type) < 0) {
                        type = 'Line';
                    }

                    var easeOutQuad = function(x, t, b, c, d) {
                        return -c * (t /= d) * (t - 2) + b;
                    };

                    var $toolTip = element
                        .append('<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-content"></div></div>')
                        .find('.tooltip')
                        .hide();
                    var $toolTipArrow = $toolTip.find('.tooltip-arrow');


                    var enableTooltip = function() {

                        var selector = '.ct-point';
                        if (type === 'Bar') {
                            selector = '.ct-bar';
                        } else if (type === 'Pie') {
                            selector = '.ct-slice';
                        }
                        element.on('mouseenter', selector, function() {
                            var $point = $(this);
                            var $g = $point.parent();
                            var value = $point.attr('ct:value');
                            var labelIndex = $g.find('line').index($point);
                            var seriesName = $point.parent().attr('ct:series-name');
                            var tip = $scope.data.labels[labelIndex] + '<br/>';
                            if (type === 'Pie') {
                                tip = $g.find('.ct-label').text() + '<br/>';
                            }
                            tip += seriesName ? seriesName + ': ' : '';
                            tip += value;

                            if (!originalStrokeWidth) {
                                originalStrokeWidth = $point.css('stroke-width');
                                originalStrokeWidth = originalStrokeWidth.substring(0, originalStrokeWidth.length - 2);
                            }
                            $point.animate({
                                'stroke-width': originalStrokeWidth * 2 + 'px'
                            }, 300, easeOutQuad);

                            $toolTip.find('.tooltip-content').html(tip);
                            $toolTip.show();

                            $toolTipArrow.css({
                                top: $toolTip.innerHeight() - 1,
                                left: $toolTip.innerWidth() / 2 - parseInt($toolTipArrow.css('border-left-width')),
                                position: 'absolute'
                            });
                        });

                        element.on('mouseleave', selector, function() {
                            var $point = $(this);

                            $point.animate({
                                'stroke-width': originalStrokeWidth + 'px'
                            }, 300, easeOutQuad);
                            $toolTip.hide();
                        });

                        element.on('mousemove', function(event) {

                            if(typeof event.offsetX === 'undefined'){
                                //the workaround here cause FF doesn't have offsetX/Y attribute
                                event.offsetX = event.originalEvent.layerX;
                                event.offsetY = event.originalEvent.layerY;
                            }
                            var left = event.offsetX - $toolTip.width() / 2 - 8;
                            var top = event.offsetY - $toolTip.height() - 40;
                            $toolTip.css({
                                left: left,
                                top: top
                            });
                        });
                    };

                    var disableTooltip = function() {
                        $toolTip.hide();
                        element.off('mouseenter mouseleave mousemove');
                    };

                    var destroy = function() {
                        if (chart) {
                            chart.detach();
                        }
                        element.off('mouseenter mouseleave mousemove');
                    };

                    var redraw = function() {
                        chart = Chartist[type](element[0], $scope.data, $scope.options, $scope.responsiveOptions);
                    };

                    $scope.$watch('ascTooltip', function(newValue) {
                        if (newValue) {
                            enableTooltip();
                        } else {
                            disableTooltip();
                        }
                    }, true);

                    $scope.$watch('options', redraw, true);
                    $scope.$watch('responsiveOptions', redraw, true);
                    $scope.$watch('data', redraw, true);

                    //unregister all the listener from the element
                    $scope.$on('$destroy', destroy);
                }
            };
        };

        smart.directive('chartist', [dir]);
    };

    if (typeof exports === 'object') {
        module.exports = definition(require('chartist'));
    } else if (typeof define === 'function' && define.amd) {
        define(['chartist'], definition);
    } else {
        definition(global.Chartist);
    }

}(window, angular, jQuery));
