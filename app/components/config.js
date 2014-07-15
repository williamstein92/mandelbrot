define(["components/util"], function (util) {
  var Config;
  var ConfigError;

  Config = function ()
  {
    this.data = {};
  }

  Config.prototype.has = function (name)
  {
    return !!this.data[name];
  }

  Config.prototype.set = function (name, value)
  {
    return this.data[name] = value;
  }

  Config.prototype.get = function (name)
  {
    return this.data[name];
  }

  Config.prototype.bounce = function (name, value)
  {
    return ! this.has(name) ? this.set(name, value) : value || this.get(name);
  }

  Config.prototype.new = function ()
  {
    return new Config;
  }

  ConfigError = function (message) {
    Error.captureStackTrace(this, this.constructor);

    this.message  = message;
    this.name     = "ConfigError";
  };

  util.extend(Error, ConfigError);

  Config.prototype.error = ConfigError;

  return new Config;
});
