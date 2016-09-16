'use strict';

const Util = require('./util');

module.exports = function(table, cmdstrs, opts) {
  const dp = Util.dp(opts);

  const keystr = cmdstrs.join(' ').trim();
  const key = Util.parseKey(keystr);

  dp.getPromise(table, key)
  .then(function(item){
    console.log(JSON.stringify(item, null, 2));
  })
  .catch((err) => {
    console.error(err);
  })
}
