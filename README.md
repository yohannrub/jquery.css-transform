# jQuery Transform

jQuery Transform is a lightweight jQuery plugin that adds transform manipulation and animation support.  
It only handles 2D transforms.


## Usage

2D transforms can be used as properties in jQuery *css* and *animate* functions.  
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
