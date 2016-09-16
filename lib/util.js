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


const DynamoProcessor = require('dynamo-processor');

exports.dp = function(opts) {
  const awsOpts = {
    logger: {
      debug: function(){},
      info:  function(){},
      warn:  function(){},
      error: function(msg){ console.error(msg) },
    }
  };

  awsOpts.region = opts.region || process.env.AWS_DEFAULT_REGION || 'ap-northeast-1';

  if (opts.profile) {
    process.env.AWS_PROFILE = opts.profile;
  }

  if (opts.local) {
    awsOpts = {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
      endpoint: new AWS.Endpoint('http://localhost:8000')
    };
  }

  return DynamoProcessor(awsOpts);
}
