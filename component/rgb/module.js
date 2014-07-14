define(function () {
  var RGB;

  RGB = function (r, g, b)
  {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  RGB.prototype.toString = function ()
  {
    return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
  }

  RGB.prototype.interpolate = function (other, amount)
  {
    var channel;
    var range;
    var output;

    output = new this.constructor(0, 0, 0);

    for (channel in this) {
      if (this.hasOwnProperty(channel)) {
        range = this[channel] - other[channel];
        output[channel] = parseInt(this[channel] - (range * amount));
      }
    }

    return output;
  }

  return RGB;

});
