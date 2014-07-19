(function () {

  'use strict';

  var __isObj = function (x)
  {
    var type = typeof x;
    return type === 'function' || type === 'object';
  }

  var bootstrap = function (func)
  {
    var isBrowser = typeof window == 'object';
    var isNode    = typeof module == 'object' && typeof exports == 'object' && typeof module.exports == 'object';
    var alias = 'app';

    if (isBrowser)  func();
    if (isNode)     module.exports  = main;
  }

  var __limit = 1000;

  var __colors = [
    [0, 0, 0],
    [255, 170, 0],
    [255, 255, 255],
    [0, 25, 120],
    [0, 0, 0],
  ];

  var __cache = {
    'storage': {},
    'length': 0,
    'remove': function (key)
    {
      this.storage[key] = undefined;
      this.length = -1 + this.length;
    },
    'pick': function (key)
    {
      return this.storage[key];
    },
    'put': function (key, value)
    {
      this.storage[key] = value;
      this.length = 1 + this.length;
    }
  }

  function __type2(obj) // array lookups are faster than function calls
  {
    var id = Object.prototype.toString.call(obj);

    switch (id) {
      case '[object String]':
        var ret = 'string';
      case '[object Number]':
        var ret = 'number';
      case '[object Array]':
        var ret = 'array';
      case '[object Function]':
        var ret = 'function';
      case '[object Object]':
        var ret = 'object';
    }

    return ret;
  }

  function __viewFactory(size, y1, y2)
  {
    var yrange = -y1 + y2;
    var yoffset = y1;

    return function (x) {
      return x/size*yrange + yoffset;
    }
  }

  function __iterateNext(z, zi)
  {
    var i = this.i;
    var x = this.x;
    var y = this.y;

    // perform operations
    var z2 = z*z;
    var zi2 = zi*zi;
    var zz = z2 + zi2;
    var zzi = z*zi;

    if (i < this.limit && zz < 4) {
      this.i = 1 + i;
      // multiplication of floats is slower than addition
      this.defer(z2 - zi2 + x, zzi + zzi + y);
    } else {
      this.end(zz);
    }
  }

  function __iterateStart()
  {
    var cached;
    var x = this.x;
    var y = this.y;

    if (cached = __cache.pick(x, y))
      this.callback(x, y, cached);
    else
      this.next(0, 0);
  }

  function __iterateDefer(z, zi)
  {
    setTimeout(this.next, 0, z, zi);
  }

  function __iterateNoDefer(z, zi)
  {
    this.next(z, zi);
  }

  function __iterateEnd(z)
  {
    var i = this.i;
    var x = this.x;
    var y = this.y;

    var log2 = Math.log(2);

    if (i < this.limit) {
      var zn = Math.sqrt(z);
      var nu = Math.log(Math.log(zn) / log2) / log2;
      i = -nu + i + 1;
    }

    this.callback(x, y, i + ' :: cache miss');
  }

  function __iterator(x, y, callback, limit)
  {
    var limit = limit || __limit;

    return {
      'lim': limit,
      'x': x,
      'y': y,
      'i': 0,
      'next': __iterateNext,
      'start': __iterateStart,
      'defer': __iterateNoDefer,
      'end': __iterateEnd,
      'callback': callback,
    };
  }

  function __square(x, y, width, height)
  {

  }

  function __gradient(x)
  {
    x = Math.max(x, 0);
    x = Math.min(x, 1);

    var range = -1 + __colors.length;
    var xx = x*range;
    var intxx = xx|0;

    if (x|0 === x) return __colors[xx];

    var a = __colors[intxx + 1];
    var b = __colors[intxx];

    // x - x|0 is faster than %
    // and -x + y is faster than y - x
    return interpolate(a, b, (-intxx + x));
  }

  function __draw(x, y, value)
  {
    //console.log('x: ' + x + ', y: ' + y + ', value: ' + value);
  }

  function __interpolate(a, b, amount)
  {
    var output = [0,0,0];

    for (var i = 3; i--;) {
      var range = -b[i] + a[i];
      output[i] = b[i] + range*amount|0;
    }

    return output;
  }

  function __nil() {}

  function main()
  {
    var width = 1280 / 128|0;
    var height = 800 / 128|0;
    var xscale = __viewFactory(width, -2.5, 1);
    var yscale = __viewFactory(height, -1, 1);

    for (var x = width; x = - 1 + x;) {
      for (var y = height; y = -1 + y;) {
        var scaledx = +xscale(x).toFixed(9);
        var scaledy = +yscale(y).toFixed(9);

        var it = new __iterator(scaledx, scaledy, __nil);
        it.start();
      }
    }

    return true;
  }

  bootstrap();

})();