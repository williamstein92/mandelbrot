(function () {
  __env__ = {
    "PRODUCTION": [],
    "DEVELOPMENT": [],
  }

  requirejs.config({
    "baseUrl": "component/",
    "paths": {
      "vendor": "vendor/",
      "app": "../"
    },
    "shim": {
      "vendor/locache/locache": []
    }
  });

  require(["app/main"]);
})();
