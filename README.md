# jQuery Transform

jQuery Transform is a lightweight jQuery plugin that adds transform manipulation and animation support.  
It only handles 2D transforms.


## Usage

This plugin installs a [`cssHook`](http://api.jquery.com/jQuery.cssHooks/) which allows jQuery's [`.css()`](http://api.jquery.com/css) and [`.animate()`](http://api.jquery.com/animate) to set and animate transforms.  
Values are defined in *px* for lengths (translations), and in *deg* for angles (rotations and skews).

```javascript
$('#element').animate({'translateX': 200});
$('#element').animate({'translateY': 200});
$('#element').animate({'scaleX': 2});
$('#element').animate({'scaleY': 2});
$('#element').animate({'skewX': 20});
$('#element').animate({'skewY': 20});
$('#element').animate({'rotate': 50});
```


## Extra

`$.support.cssTransform` is assigned the supported (vendor-prefixed or not) css transform property (e.g. `WebkitTransform`), *false* if css transforms are not supported.  
`$.support.cssTransition` is assigned the supported (vendor-prefixed or not) css transition property (e.g. `WebkitTransition`), *false* if css transitions are not supported.
