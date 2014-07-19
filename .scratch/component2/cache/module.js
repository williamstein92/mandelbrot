define(["component/node/module"], function (node) {

  var Cache;

  Cache = function (limit, expiration)
  {
    this.limit = limit;
    this.expiration = expiration;

    this.bin = [];
    this.size = 0;
  };

  Cache.prototype.put = function (index, value)
  {
    this.bin.unshift({
      "index": index,
      "value": value,
      "at": Date.now()
    });

    this.size++;
    this.purge();

    if (this.size > this.limit) this.shrink();
  }

  Cache.prototype.pick = function (index, pos)
  {
    var cached;

    if (this.bin[pos].index === index) {
      cached = this.bin[pos];
      this.put(cached.index, cached.value);
    } else {
      return false;
    }
  }

  Cache.prototype.purge = function ()
  {

  }

  Cache.prototype.shrink = function ()
  {
    this.bin.pop();
    this.size--;
  }

  return Cache;

});
