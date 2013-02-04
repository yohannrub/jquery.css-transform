/*!
 * jQuery CSS Transform v@1.1
 * https://github.com/yohannrub/jquery.css-transform
 * Licensed under the MIT license
 */

;(function($) {

    function getStyleProperty(element, properties) {
        var p;
        while (p = properties.shift()) {
            if (p in element.style) {
                return p;
            }
        }
        return false;
    }

    var divElement = document.createElement('div');
    var cssTransformProperty = $.support.cssTransform = getStyleProperty(divElement, ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform']);
    $.support.cssTransition = getStyleProperty(divElement, ['transition', 'msTransition', 'WebkitTransition', 'MozTransition', 'OTransition']);

    if (cssTransformProperty) {

        var DEFAULT_TRANSFORM_VALUES = {
            'translateX': 0,
            'translateY': 0,
            'translateZ': 0,
            'scaleX': 1,
            'scaleY': 1,
            'scaleZ': 1,
            'skewX': 0,
            'skewY': 0,
            'rotate': 0,
            'rotateX': 0,
            'rotateY': 0,
            'rotateZ': 0,
            'perspective': 0
        };

        var TRANSFORM_SEPARATOR = ' ';

        var namespace = 'cssTransform';

        function getTransformData(elem, transformKey) {
            var $elem = $(elem),
                data = $elem.data(namespace);

            return (data && data[transformKey]) ? data[transformKey] : DEFAULT_TRANSFORM_VALUES[transformKey];
        }

        function updateTransformData(elem, transform) {
            var $elem = $(elem),
                data = $elem.data(namespace);

            $elem.data(namespace, $.extend(data, DEFAULT_TRANSFORM_VALUES, transform));
        }

        var methods = {
            init: function(options) {
            },

            save: function() {
                return this.each(function() {
                    var transform = {};
                    transform[cssTransformProperty] = this.style[cssTransformProperty];
                    updateTransformData(this, transform);
                });
            },

            restore: function() {
                return this.each(function() {
                    var transform = {},
                        cssTransformValue = this.style[cssTransformProperty];
                    if (cssTransformValue) {
                        var cssTransformValueArray = cssTransformValue.split(TRANSFORM_SEPARATOR);
                        cssTransformValueArray.pop();
                        cssTransformValue = cssTransformValueArray.join(TRANSFORM_SEPARATOR);
                    }
                    transform[cssTransformProperty] = this.style[cssTransformProperty] = cssTransformValue;
                    updateTransformData(this, transform);
                });
            },

            reset: function() {
                return this.each(function() {
                    var transform = {};
                    transform[cssTransformProperty] = this.style[cssTransformProperty] = '';
                    updateTransformData(this, transform);
                });
            }
        };

        $.fn[namespace] = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.' + namespace);
            }
        };

        $(function() {
            $.each(DEFAULT_TRANSFORM_VALUES, function(cssTransformHook, cssTransformDefaultValue) {

                $.cssNumber[cssTransformHook] = /^scale/.test(cssTransformHook);

                $.cssHooks[cssTransformHook] = {
                    get: function(elem, computed, extra) {
                        return getTransformData(elem, cssTransformHook);
                    },
                    set: function(elem, value) {
                        var transform = {},
                            cssTransformValue = getTransformData(elem, cssTransformProperty);
                        transform[cssTransformHook] = value;
                        updateTransformData(elem, transform);

                        elem.style[cssTransformProperty] = (cssTransformValue ? cssTransformValue + TRANSFORM_SEPARATOR : '') + cssTransformHook + '(' + value + ')';
                    }
                };

                $.fx.step[cssTransformHook] = function(fx) {
                    $.cssHooks[cssTransformHook].set(fx.elem, $.cssNumber[cssTransformHook] ? fx.now : fx.now + fx.unit);
                };
            });
        });
    }

})(jQuery);
