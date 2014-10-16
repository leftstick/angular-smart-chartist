/**
 *
 *  Usage:
 *
 *       <chartist tooltip="status" data="data" class="ct-chart ct-minor-seventh" options="options"></chartist>
 *
 *  @author Howard.Zuo
 *  @date Oct 16, 2014
 *
 **/
(function(global, angular, Chartist, $) {
    'use strict';

    var chartTypes = ['Bar', 'Line', 'Pie'];

    var smart = angular.module('angular-smart-chartist', []);

    var dir = function() {
        return {
            restrict: 'AE',
            scope: {
                type: '@',
                tooltip: '=',
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
                    element.on('mouseenter', '.ct-point', function() {
                        var $point = $(this);
                        var $g = $point.parent();
                        var value = $point.attr('ct:value');
                        var labelIndex = $g.find('line').index($point);
                        var seriesName = $point.parent().attr('ct:series-name');
                        var tip = $scope.data.labels[labelIndex] + '<br/>';
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

                    element.on('mouseleave', '.ct-point', function() {
                        var $point = $(this);

                        $point.animate({
                            'stroke-width': originalStrokeWidth + 'px'
                        }, 300, easeOutQuad);
                        $toolTip.hide();
                    });

                    element.on('mousemove', function(event) {
                        $toolTip.css({
                            left: event.offsetX - $toolTip.width() / 2 - 8,
                            top: event.offsetY - $toolTip.height() - 40
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

                $scope.$watch('tooltip', function(newValue) {
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

}(window, angular, Chartist, jQuery));
