(function () {

  var Application; // :7
  var Type; // :17
  var Assert; // :64

  Application = function (Type, dependencies, aliases) {
    var i;

    for (i in dependencies)
      Type.link(this, dependencies[i], i);

    for (i = 0; i < aliases.length; i += 1)
      Type.link(window, this, aliases[i]);
  }

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

  Type.link = function (This, asThis, That, asThat) {
    var i;
    var that;
    var scopes;
    var sub;

    if (typeof That === "function")
      that = new That;
    else
      that = That;

    scopes = asThat.split(".")
    scope = This;

    for (i = 0; i < scopes.length - 1; i += 1) {
      sub = scopes[i];
      if ( ! scope[sub])
      scope[sub] = {};
      scope = scope[sub];
    }

    scope[scopes.pop()] = that;
  };

  Assert = {};

  Assert.type = function (unknown, Type) {
    if ( ! typeof type === "function")
      return this.Utilities.getType(argument) === this.Utilities.getType(type);
    else
      return argument instanceof type;
  };

  var app = new Application(Type, {
    "utilities.assert": Assert,
    "utilities.type": Type,
  }, [
    "app"
  ]);
})();
