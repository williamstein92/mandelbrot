define(["components/set", "vendor/locache", "components/config"], function (set, cache, config) {
  var Tile;
  var TileError;

  Tile = function(x0, y0, x1, y1, incr)
  {
    var key;
    var cached;

    key = [x0, y0, x1, y1].toString();

    if ( ! config.has('set.limit')) throw new config.error('No configuration found for set.limit');
    if ( ! x0 || ! y0 || ! x1 || ! y1) throw new TypeError('Tile takes exactly 4 arguments (' + arguments.length + ' given)');
    if (x0 >= x1) throw new TypeError('Tile expects argument 1 < argument 3');
    if (y0 >= y1) throw new TypeError('Tile expects argument 2 < argument 4');
    
    this.set = new set;
    this.cache = cache;

    if (cached = null){//this.cache.get(key)) {
      this.data = cached;
    } else {
      this.data = {};

      for (x = x0; x < x1; x += incr) {
        this.data[x] = {};
        for (y = y0; y < y1; y += incr) {
          this.data[x][y] = this.set.iterate(x, y, 0, 0, 0);
        }
      }

      this.cache.set(key, this.data);
    }
  }

  return Tile;
});
