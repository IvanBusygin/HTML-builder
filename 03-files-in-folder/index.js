const path = require('path');
const {readdir} = require('fs/promises');
const {stat} = require('fs');

const folder = path.join(__dirname, 'secret-folder');

const files = readdir(folder, {withFileTypes: true});
files.then((dir) => {
  for (const file of dir) {
    if (file.isFile()) {
      const fileName = file.name;
      const filePath = path.join(folder, fileName);
      const ext = (path.parse(fileName).ext).slice(1);
      const name = path.parse(fileName).name;

      stat(filePath, (err, stats) => {
        if (err) {
          console.log(err.message);
        } else {
          const size = (stats.size / 1024).toFixed(3) + 'kB';
          console.log(`${name} - ${ext} - ${size}`);
        }
      });
    }
  }
});
