define(["vendor/locache", "components/config"], function (cache, config) {
  var Set;

  Set = function (limit)
  {
    this.limit = config.bounce('set.limit', limit);
    this.cache = cache;
  }

  Set.prototype.iterate = function (x, y, z, zi, iteration)
  {
    var cached;

    if (iteration < this.limit && z * z + zi * zi < 4) {
      if (cached = this.cache.get([z, zi].toString())) {
        return cached;
      } else {
        return this.iterate(
          z * z - zi * zi + x,
          2 * z * zi + y,
          ++iteration
        );
      }
    } else {
      if (iteration < this.limit) {
        zn = Math.sqrt(z * z + zi * zi);
        nu = Math.log( Math.log(zn) / Math.log (2)) / Math.log(2);
        iteration = iteration + 1 - nu;
      }

      this.cache.set([z, zi].toString(), iteration);

      return iteration;
    }
  }

  return Set;

});
