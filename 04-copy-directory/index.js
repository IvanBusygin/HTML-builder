const path = require('path');
const P = require('fs/promises');

const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

(async () => {
  try {
    await P.rm(folderCopy, {recursive: true, force: true});

    const arrFiles = await P.readdir(folder);

    if (arrFiles.length !== 0) {
      await P.mkdir(folderCopy);
      for (const fileName of arrFiles) {
        const copyPath = path.join(folderCopy, fileName);
        const filePath = path.join(folder, fileName);
        const isFile = (await P.stat(filePath)).isFile();
        if (isFile) {
          await P.copyFile(filePath, copyPath);
          console.log(`File ${fileName} have been copied.`);
        }
      }
    } else {
      console.log('The "files" folder is empty.');
    }

  } catch (err) {
    console.log(err);
  }
})();
