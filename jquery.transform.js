/*!
 * jQuery Transform v@1.0.1
 * https://github.com/yohannrub/jquery.transform
 * Licensed under the MIT license
 */

;(function($) {

    var UNITS = {
        length: 'px',
        angle: 'deg'
    };

    var RAD_TO_DEG = 180 / Math.PI,
        DEG_TO_RAD = Math.PI / 180;

    function getStyleProperty(element, properties) {
        var p;
        while (p = properties.shift()) {
            if (typeof element.style[p] != 'undefined') {
                return p;
            }
        }
        return false;
    }

    $.support.cssTransform = getStyleProperty(document.createElement('div'), ['transform', 'msTransform', 'WebkitTransform', 'MozTransform', 'OTransform']);
    $.support.cssTransition = getStyleProperty(document.createElement('div'), ['transition', 'msTransition', 'WebkitTransition', 'MozTransition', 'OTransition']);

    if ($.support.cssTransform) {

        var rmatrix = /matrix\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\)/;

        $.cssHooks['translateX'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? parseFloat(m[5]) : 0;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [$1, $2, $3, $4, parseFloat(value), $6].join(',') + ')'; }) : 'translateX(' + parseFloat(value) + UNITS.length + ')';
            }
        };
        $.cssHooks['translateY'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? parseFloat(m[6]) : 0;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [$1, $2, $3, $4, $5, parseFloat(value)].join(',') + ')'; }) : 'translateY(' + parseFloat(value) + UNITS.length + ')';
            }
        };

        $.cssHooks['scaleX'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? parseFloat(m[1]) : 1;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [parseFloat(value), $2, $3, $4, $5, $6].join(',') + ')'; }) : 'scaleX(' + parseFloat(value) + ')';
            }
        };
        $.cssHooks['scaleY'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? parseFloat(m[4]) : 1;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [$1, $2, $3, parseFloat(value), $5, $6].join(',') + ')'; }) : 'scaleY(' + parseFloat(value) + ')';
            }
        };

        $.cssHooks['skewX'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? Math.atan(parseFloat(m[3])) * RAD_TO_DEG : 0;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [$1, $2, Math.tan(parseFloat(value) * DEG_TO_RAD), $4, $5, $6].join(',') + ')'; }) : 'skewX(' + parseFloat(value) + UNITS.angle + ')';
            }
        };
        $.cssHooks['skewY'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? Math.atan(parseFloat(m[2])) * RAD_TO_DEG : 0;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [$1, Math.tan(parseFloat(value) * DEG_TO_RAD), $3, $4, $5, $6].join(',') + ')'; }) : 'skewY(' + parseFloat(value) + UNITS.angle + ')';
            }
        };

        $.cssHooks['rotate'] = {
            get: function(elem, computed, extra) {
                var transform = $.css(elem, $.support.cssTransform),
                    m = transform.match(rmatrix);
                return m ? Math.atan2(parseFloat(m[2]),parseFloat(m[1])) * RAD_TO_DEG : 0;
            },
            set: function(elem, value) {
                var transform = $.css(elem, $.support.cssTransform);
                var valueRad = parseFloat(value) * DEG_TO_RAD;
                elem.style[$.support.cssTransform] = transform.match(rmatrix) ? transform.replace(rmatrix, function(m, $1, $2, $3, $4, $5, $6) { return 'matrix(' + [Math.cos(valueRad), Math.sin(valueRad), -Math.sin(valueRad), Math.cos(valueRad), $5, $6].join(',') + ')'; }) : 'rotate(' + parseFloat(value) + UNITS.angle + ')';
            }
        };

        $.fx.step['translateX'] = function(fx) {
            $.cssHooks['translateX'].set(fx.elem, fx.now);
        };
        $.fx.step['translateY'] = function(fx) {
            $.cssHooks['translateY'].set(fx.elem, fx.now);
        };
        $.fx.step['scaleX'] = function(fx) {
            $.cssHooks['scaleX'].set(fx.elem, fx.now);
        };
        $.fx.step['scaleY'] = function(fx) {
            $.cssHooks['scaleY'].set(fx.elem, fx.now);
        };
        $.fx.step['skewX'] = function(fx) {
            $.cssHooks['skewX'].set(fx.elem, fx.now);
        };
        $.fx.step['skewY'] = function(fx) {
            $.cssHooks['skewY'].set(fx.elem, fx.now);
        };
        $.fx.step['rotate'] = function(fx) {
            $.cssHooks['rotate'].set(fx.elem, fx.now);
        };

    }

})(jQuery);
