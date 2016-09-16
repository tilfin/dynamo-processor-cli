'use strict';

const Util = require('./util');

module.exports = function(table, cmdstrs, opts) {
  const dp = Util.dp(opts);

  let data = cmdstrs.join(' ').trim();
  if (data.charAt(0) !== '{') {
    data = `{${data}}`
  }
  eval('data = ' + data);

  dp.putPromise(table, data)
  .then(function(item){
    console.log(JSON.stringify(item, null, 2));
  })
  .catch((err) => {
    console.error(err);
  })
}
