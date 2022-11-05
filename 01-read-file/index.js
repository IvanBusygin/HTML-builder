const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');
const { stdout, stderr  } = process;

const stream = fs.createReadStream(file);
stream.setEncoding('utf8');
stream.on('data', chunk => stdout.write(chunk));
stream.on('error', error => stderr.write(`${error.code === 'ENOENT' ? 'File not found' : error.message }`));
