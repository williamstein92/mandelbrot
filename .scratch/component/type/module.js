define(function () {

  Type = {};

  Type.which = function (unknown)
  {
    return  Object.prototype.toString
              .call(unknown)
              .match(/\[object ([A-Z][a-z]+)\]/)[1]
              .toLowerCase();
  }

  Type.extend = function (parent, child)
  {
    var Surrogate = function () {};
    Surrogate.prototype = parent.prototype;

    child.prototype = new Surrogate();
    child.prototype.constructor = child;

    child.prototype.parent = parent.prototype;
  }

  return Type;

});
