'use strict';

const AWS = require('aws-sdk');
const cli = module.exports;

const commands = {
  get: require('./get'),
  put: require('./put'),
};


cli.run = function(argv) {
  if (argv._.length < 3) return;

  const awsOpts = { region: process.env.AWS_DEFAULT_REGION };
  if (argv.l || argv.local) {
    awsOpts = {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
      region: 'us-east-1',
      endpoint: new AWS.Endpoint('http://localhost:8000')
    };
  }

  const dp = require('dynamo-processor')(awsOpts);

  const action = argv._[0];
  const table = argv._[1];

  const cmd = commands[action];
  if (!cmd) {
    console.error('action is invalid');
    return;
  }
  cmd(dp, table, argv._.slice(2));
}
