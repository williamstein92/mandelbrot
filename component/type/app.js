define(function () {
  Type = {};

  Type.which = function (unknown) {
    return  Object.prototype.toString
              .call(unknown)
              .match(/\[object ([A-Z][a-z]+)\]/)[1]
              .toLowerCase();
  };

  Type.extend = function (Parent, Child) {
    var Surrogate = function () {};
    Surrogate.prototype = Parent.prototype;

    Child.prototype = new Surrogate();
    Child.prototype.constructor = Child;

    Child.prototype.Parent = Parent.prototype;
  };

  return Type;
});
