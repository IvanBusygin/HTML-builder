const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'files');

fs.readdir(folder, (err, data) => {
  const folderCopy = path.join(__dirname, 'files-copy');
  fs.stat(folderCopy,  (err) => {
    if (err) {
      // console.log('Папка не найдена');
      fs.mkdir(folderCopy, {recursive: true}, (err) => {
        if (err) throw err;
        // console.log('Папка создана!');
      });
      copyFile();
    } else {
      // console.log('Папка найдена');
      fs.readdir(folderCopy, (err, data) => {
        data.forEach(f => {
          const p = path.join(folderCopy, f);
          fs.unlink(p, err => {
            if (err) throw err;
            // console.log(`Файл ${f} успешно удалён`);
          });
        });
        copyFile();
      });
    }
  });
  
  function copyFile() {
    data.forEach(f => {
      const first = path.join(folder, f);
      const copy = path.join(folderCopy, f);
      fs.copyFile(first, copy, err => {
        if (err) throw err;
        console.log(`Файл ${f} успешно скопирован`);
      });
    });
  }
  // console.log(data);
});

