(function () {
  var Screen, screen;
  var View, view;
  var ScaleFactory;
  var RGB;
  var Gradient;
  var Mandelbrot, mandelbrot;
  var ArrayOf;

  var main;
  var __name__;
  var put;

  __name__ = null;

  var put = function (json, send) {
    return (send) ? console.log(JSON.stringify(json).split(",").join("\n")) : false;
  }

  RGB = function (r, g, b) {
    this[0] = this.r = r;
    this[1] = this.g = g;
    this[2] = this.b = b;
  };

  RGB.prototype.toString = function () {
    return "rgb(" + (this[0] || this.r) + "," + (this[1] || this.g) + "," + (this[2] || this.b) + ")";
  };

  RGB.prototype.interpolate = function (other, amount) {
    var i;
    var range;
    var output;

    output = new this.constructor(0, 0, 0);

    for (i = 0; i < 3; i += 1) {
      range = this[i] - other[i];
      output[i] = parseInt(this[i] - (range * amount));
    }

    return output;
  };

  Gradient = function (colors) {
    this.colors = colors;
  };

  Gradient.prototype.get = function (x) {

    x = Math.max(x, 0);
    x = Math.min(x, 1);

    var Upper, upper;
    var Lower, lower;
    var range;

    range = this.colors.length - 1;

    if (parseInt(x) === x) return this.colors[x * range];

    upper = Math.ceil(x * range)
    Upper = this.colors[upper];
    lower = Math.floor(x * range)
    Lower = this.colors[lower];

    put({
      "Upper": Upper,
      "Lower": Lower,
      "x": x,
      "x * range": x * range,
    }, false);

    return Lower.interpolate(Upper, (x * range - lower));
  };

  ScaleFactory = function (from, to) {
    var range, offset;

    range = [
      from[1] - from[0],
      to[1] - to[0],
    ];

    offset = [
      -1 * from[0],
      to[0],
    ];

    return function (x) {
      return (x + offset[0]) / range[0] * range[1] + offset[1];
    };
  };

  ArrayOf = function (fill, length) {
    return Array.apply(null, new Array(length)).map(function (x) {return x;}, fill);
  };

  Screen = function (element, width, height) {
    element.width   = width;
    element.height  = height;

    this._context = element.getContext("2d");
    this.width    = width;
    this.height   = height;
    this.ratio    = width / height;

    this.bin      = ArrayOf(ArrayOf(0, this.width), this.height);
  };

  Screen.prototype.draw = function (x, y, RGB) {
    this._context.fillStyle = RGB.toString();
    this._context.fillRect(x, y, 1, 1);
    //this.bin[y][x] = RGB;
  };

  Screen.prototype.shift = function (xx, yy) {
    for (y = 0; y < this.height; y++) {
      for (x = 0; x < this.width; x++) {
        this.bin[y][x]
      }
    }
  }

  View = function (screen) {
    var h;

    h = 3.5 / (screen.ratio * 2);

    this._screen = {
      "width": [0, screen.width],
      "height": [0, screen.height]
    };

    this.range = {
      "x": [-2.5, 1],
      "y": [-h, h]
    }

    this.x = ScaleFactory(this._screen.width, this.range.x);
    this.y = ScaleFactory(this._screen.height, this.range.y);
  };

  View.prototype.zoom = function (amount) {
    var width, w;
    var height, h;

    width = this.range.x[1] - this.range.x[0];
    height = this.range.y[1] - this.range.y[0];

    w = width * amount / 2;
    h = height * amount / 2;

    this.range = {
      "x": [
        this.range.x[0] - w,
        this.range.x[1] + w,
      ],
      "y": [
        this.range.y[0] - h,
        this.range.y[1] + h,
      ]
    };

    this.x = ScaleFactory(this._screen.width, this.range.x);
    this.y = ScaleFactory(this._screen.height, this.range.y);
  };

  View.prototype.shift = function (x, y) {
    var width, w;
    var height, h;

    width = this.range.x[1] - this.range.x[0];
    height = this.range.y[1] - this.range.y[0];

    w = width * x;
    h = height * y;

    this.range = {
      "x": [
        this.range.x[0] - x,
        this.range.x[1] - x,
      ],
      "y": [
        this.range.y[0] - y,
        this.range.y[1] - y,
      ]
    };

    this.x = ScaleFactory(this._screen.width, this.range.x);
    this.y = ScaleFactory(this._screen.height, this.range.y);
  };

  Mandelbrot = function (iterations) {
    this.iterations = iterations;
  };

  Mandelbrot.prototype.get = function (x, y) {
    var z, zi;
    var i;

    z = 0;
    zi = 0;
    i = 0;

    while (z * z + zi * zi < 4 && i++ < this.iterations) {
      temp_z = (z * z) - (zi * zi) + x;
      temp_zi = 2 * z * zi + y;
      
      if (z === temp_z && zi === temp_zi && i > 1) {
        i = this.iterations + 1;
        break;
      }

      z = temp_z;
      zi = temp_zi;
    }

    if (i < this.iterations) {
      zn = Math.sqrt(z * z + zi * zi);
      nu = Math.log( Math.log(zn) / Math.log (2)) / Math.log(2);
      i = i + 1 - nu;
    }

    return --i;
  }

  Loader = function (element) {
    this.self = element;
  }

  Loader.prototype.hide = function () {
    this.self.className = "hide";
  }

  Loader.prototype.show = function () {
    this.self.className = "show";
  }

  Loader.prototype.message = function (msg) {
    this.self.innerHTML = msg;
  }

  screen = new Screen(
    document.getElementById("canvas"),
    window.innerWidth,
    window.innerHeight
  );

  loader = new Loader(document.getElementById("loading"));

  view = new View(screen);

  gradient = new Gradient([
    new RGB(0, 0, 0),
    new RGB(255, 170, 0),
    new RGB(255, 255, 255),
    new RGB(0, 25, 120),
    new RGB(0, 0, 0),
  ]);

  mandelbrot = new Mandelbrot(1000);

  window.gradient = gradient;
  window.view     = view;
  window.rgb      = RGB;

  window.addEventListener("keydown", function (evt) {
    var amount;
    var redraw;
    var msg;

    redraw = true;
    msg = "";

    amountx = -50 * ((view.range.x[0] - view.range.x[1]) / screen.width); // equivalent to 1 pixel motion
    amounty = -50 * ((view.range.y[0] - view.range.y[1]) / screen.height);

    switch (evt.keyCode) {
      case 38: // up arrow
        view.zoom(-0.5);
        msg = "Zooming in...";
        break;
      case 40: // down arrow
        view.zoom(0.5);
        msg = "Zooming out...";
        break;

      case 87: // w 
        view.shift(0, amounty);
        msg = "Moving up...";
        break;
      case 83: // s
        view.shift(0, -amounty);
        msg = "Moving down...";
        break;
      case 65: // a
        view.shift(amountx, 0);
        msg = "Moving left...";
        break;
      case 68: // d
        view.shift(-amountx, 0);
        msg = "Moving right...";
        break;
      default:
        ;
    }

    if (redraw) {
      setTimeout(function () {
        loader.message(msg);
        setTimeout(function () {
          main();
          setTimeout(function () {
            loader.message(
            "(" + view.x(0) + ", " + view.y(0) + ") (" + view.x(screen.width) + ", " + view.y(screen.height) + ")"
            );
          }, 3);
        }, 2);
      }, 1);
    }
  }, false);

  main = function () {
    var __name__;

    __name__ = "main";

    for (y = 0; y < screen.height; y++) {
      for (x = 0; x < screen.width; x++) {
        var distance;
        var color;

        distance = mandelbrot.get(
            view.x(x),
            view.y(y)
        ) / (mandelbrot.iterations / 16) % 1;

        color = gradient.get(distance);

        screen.draw(x, y, color);
      }
    }
  }

  setTimeout(function () {
    loader.message("Starting up!");
    setTimeout(function () {
      main();
      setTimeout(function () {
        loader.message(
        "[w][a][s][d] to move [&uarr;][&darr;] to zoom"
        );
      }, 3);
    }, 2);
  }, 1);

})();
