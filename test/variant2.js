module.exports = function ()
{
  'use strict';

  var __limit = 1000;

  var __cache = {
    'storage': {},
    'length': 0,
    'remove': function (key)
    {
      this.storage[key] = undefined;
      this.length = this.length - 1;
    },
    'pick': function (key)
    {
      return this.storage[key];
    },
    'put': function (key, value)
    {
      this.storage[key] = value;
      this.length = this.length + 1;
    }
  }

  function __type(obj)
  {
    return Object.prototype.toString.call(obj).match(/\[[a-z]+\s([A-Z][a-z]+)\]/)[1].toLowerCase();
  }

  function __viewFactory(size, y1, y2)
  {
    var xrange = size;
    var yrange = y2 - y1;

    var yoffset = y1;

    return function (x) {
      return x/xrange*yrange + yoffset;
    }
  }

  function __iterateNext(z, zi)
  {
    var i = this.i;
    var x = this.x;
    var y = this.y;

    var z2 = z*z;
    var zi2 = zi*zi;
    var zz = z2 + zi2;

    if (i < __limit && zz < 4) {
      this.i = 1 + i;
      this.defer(z2 - zi2 + x, 2*z*zi + y);
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
      this.callback(x, y, cached + ' :: cache hit');
    else
      this.next(0, 0);
  }

  function __iterateDefer(z, zi)
  {
    setTimeout(this.next, 1, z, zi);
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

    if (i < __limit) {
      zn = Math.sqrt(z);
      nu = Math.log(Math.log(zn) / log2) / log2;
      i = i + 1 - nu;
    }

    __cache.put(x + ',' + y, i);

    this.callback(x, y, i + ' :: cache miss');
  }

  function __iterator(x, y, callback)
  {
    return {
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

  function __draw(x, y, value)
  {
    //console.log('x: ' + x + ', y: ' + y + ', value: ' + value);
  }

  function nil() {}

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

        var it = new __iterator(scaledx, scaledy, nil);
        it.start();
      }
    }

    return true;
  }

  main();
}