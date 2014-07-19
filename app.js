
var __limit = 1000;

var __cache = {
  "storage": {},
  "length": 0,
  "remove": function (key)
  {
    this.storage[key] = undefined;
    this.length = this.length - 1;
  },
  "pick": function (key)
  {
    return this.storage[key];
  },
  "put": function (key, value)
  {
    this.storage[key] = value;
    this.length = this.length + 1
  }
};

function __iterateNext(z, zi)
{
  var i = this.i;
  var x = this.x;
  var y = this.y;

  var z2 = z*z;
  var zi2 = zi*zi;
  var zz = z2 + zi2

  if (i < __limit && zz < 4) {
    this.i = i + 1;
    this.defer(z2 - zi2 + x, 2*z*zi + y);
  } else {
    this.stop(zz);
  }
}

function __iterateStart()
{
  var cached;

  if (cached = __cache.pick(this.x, this.y))
    this.callback(cached);
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

function __iterateStop(z)
{
  var i = this.i;
  var log = Math.log;
  var log2 = log(2);

  if (i < __limit) {
    zn = Math.sqrt(z);
    nu = log(log(zn) / log2) / log2;
    i = i + 1 - nu;
  }

  __cache.put(x + "," + y, i);

  this.callback(i);
}

function __iterator(x, y, callback)
{
  return {
    "x": x,
    "y": y,
    "i": 0,
    "go": __iterateNext,
    "start": __iterateStart,
    "defer": __iterateDefer,
    "stop": __iterateStop,
    "callback": callback,
  };
}

function __draw(value)
{
  console.log(value);
}

function main()
{
  var width = 1280;
  var height = 800;

  for (var i = width * height; i--) {
    var x = (i % width);
    var y = (i / width)|0;

    var it = new __iterator(x, y, __draw);
    it.start();
  }
}

main();
