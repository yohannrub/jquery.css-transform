# jQuery CSS Transform

jQuery CSS Transform is a lightweight jQuery plugin that adds transform manipulation and animation support for browsers supporting CSS transforms.  
It can be particularly useful for animating CSS transform properties on browsers supporting CSS transforms but not CSS transitions (e.g. IE9).  
It can handle any single-value 2D/3D CSS transformation functions (3D transforms are not supported in IE9), namely:

* 2D transforms: *translateX*, *translateY*, *scaleX*, *scaleY*, *skewX*, *skewY*, *rotate*
* 3D transforms: *translateZ*, *scaleZ*, *rotateX*, *rotateY*, *rotateZ*, *perspective*

[**Demo page**](http://yohannrub.github.com/jquery.css-transform/)


## Usage

This plugin installs a [`cssHook`](http://api.jquery.com/jQuery.cssHooks/) which allows jQuery's [`.css()`](http://api.jquery.com/css) and [`.animate()`](http://api.jquery.com/animate) to set and animate transforms.  
It uses the native CSS *transform* property and one of the specified transform function to apply the intended transform effect.  
Several transform functions cannot be applied simultaneously. However, a function is provided to save the current transformation state of the specified element, as to then apply another transformation on it (this uses the native feature of the CSS *transform* property to compose several transform functions).  
Values of the transform functions must be formatted as in the native CSS *transform* property (some transform functions explicitly require a unit).

```javascript
// Will get the current value of translateX
$('#element').css('translateX');

// Will set the current value of translateX to 200px
$('#element').css({'translateX': '200px'});

// Will animate the current value of translateX from the current value to 200px
$('#element').animate({'translateX': '200px'});

// Will save the current transformation state
$('#element').cssTransform('save');

// Will restore to the previous transformation state
$('#element').cssTransform('restore');

// Will reset the transformation state (delete all transformations)
$('#element').cssTransform('reset');

// To use 3D transformations, first set a perspective value, then save the transformation state, then apply the 3D transform function
$('#element').css({'perspective': '400px'})
    .cssTransform('save')
    .css({'rotateX': '60deg'});
```


## Extra

`$.support.cssTransform` is assigned the supported (vendor-prefixed or not) CSS transform property (e.g. `WebkitTransform`), or *false* if CSS transforms are not supported.  
`$.support.cssTransition` is assigned the supported (vendor-prefixed or not) CSS transition property (e.g. `WebkitTransition`), or *false* if CSS transitions are not supported.
