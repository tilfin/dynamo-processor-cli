'use strict';

exports.parseKey = function(str) {
  const keyFields = str.split(',');

  const keys = {};
  keyFields.map((keyField) => {
    const kv = keyField.split(':');
    const k = kv[0].trim();
    const v = convertFunzzily(kv[1].trim());
    keys[k] = v;
  });

  return keys;
}

function convertFunzzily(val) {
  if (val.match(/^\d+.?\d*$/)) {
    return Number(val);
  } else if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  } else if (val === 'null') {
    return null;
  } else {
    return val;
  }
}
