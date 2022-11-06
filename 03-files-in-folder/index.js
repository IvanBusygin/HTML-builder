const path = require('path');
const P = require('fs/promises');

const folder = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const arrFiles = await P.readdir(folder);

    for (const fileName of arrFiles) {
      const filePath = path.join(folder, fileName);
      const stats = await P.stat(filePath);
      if (stats.isFile()) {
        const name = path.parse(fileName).name;
        const ext = (path.parse(fileName).ext).slice(1);
        const size = (stats.size / 1024).toFixed(3) + 'kB';
        console.log(`${name} - ${ext} - ${size}`);
      }
    }

  } catch (err) {
    console.log(err);
  }
})();
