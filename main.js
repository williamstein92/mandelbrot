define(function () {
  require(["mandelbrotset"], function (set) {
    var mandelbrot = new set(1000);

    console.log(set.cache);
  });
});
