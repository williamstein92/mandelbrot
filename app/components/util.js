define([], function () {
  var Util;

  Util = {};

  Util.extend = function (parent, child) {
    var Surrogate = function () {};
    Surrogate.prototype = parent.prototype;

    child.prototype = new Surrogate();
    child.prototype.constructor = child;

    child.prototype.parent = parent.prototype;

    return child;
  };

  return Util;
});
