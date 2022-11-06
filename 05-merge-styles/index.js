const path = require('path');
const P = require('fs/promises');

const folderStyles = path.join(__dirname, 'styles');
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');

(async () => {
  try {
    await P.rm(bundle, {force: true});

    const arrFiles = await P.readdir(folderStyles);

    for (const fileName of arrFiles) {
      const filePath = path.join(folderStyles, fileName);
      const isFile = (await P.stat(filePath)).isFile();
      const isCSS = path.parse(filePath).ext === '.css';
      if (isFile && isCSS) {
        const fileCSS = await P.readFile(filePath, 'utf-8');
        await P.appendFile(bundle, fileCSS);
      }
    }

  } catch (err) {
    console.log(err);
  }
})();
