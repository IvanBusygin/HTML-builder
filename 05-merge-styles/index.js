const path = require('path');
const fs = require('fs');

const folderStyles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(folderStyles, (err, data) => {
  if (err) throw err;

  data.forEach(f => {
    const pathF = path.join(folderStyles, f);
    const fileExt = path.parse(pathF).ext;

    if (fileExt === '.css') {
      fs.rm(bundle, {force: true}, (err) => {
        if (err) throw err;

        const streamRead = fs.createReadStream(pathF);
        const streamWrite = fs.createWriteStream(bundle, {flags: 'a'});
        streamRead.pipe(streamWrite);
      });
    }
  });
});
