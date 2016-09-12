'use strict';

module.exports = function(dp, table, cmdstrs) {
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
