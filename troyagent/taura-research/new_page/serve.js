const { execSync } = require('child_process');
const path = require('path');
process.chdir(path.join(__dirname));
require('child_process').spawn(
  process.execPath,
  [path.join(__dirname, 'node_modules', 'webpack-dev-server', 'bin', 'webpack-dev-server.js'), '--mode', 'development', '--port', process.argv[2] || '3001'],
  { stdio: 'inherit', cwd: __dirname }
);
