(function () {
  require(["components/config", "components/tile"], function (config, tile) {
    config.set('set.limit', 1000);

    console.log(new tile(-2.5, -1, 1, 1, 0.002734375));
  });
})();