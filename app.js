
'use strict';

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var v1 = require('./test/variant1.js');
var v2 = require('./test/variant2.js');

/**/
suite.add('v1', v1)
  .on('complete', function ()
  {
    for (var i = this.length; i--;)
      console.log(this[i].toString());
  })
  .run({'async': true});
/**/
