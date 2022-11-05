const {stdin, stdout, stderr, exit} = process;
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(file);

stdout.write('Введите текст:\n');
stdin.on('data', data => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    exit();
  }
  stream.write(data);
});
stream.on('error', error => stderr.write(error.message));

process.on('SIGINT', () => exit());
process.on('exit', () => stdout.write('Ввод завершен. Создан файл с веденным текстом.'));
