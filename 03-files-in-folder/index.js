const fs = require('fs');
const path = require('path');

const dir = 'secret-folder';
const dirPath = path.join(__dirname, dir);

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.log('Error!', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    fs.stat(filePath, (statErr, stats) => {
      if (statErr) {
        console.log('Error!', err);
        return;
      }

      console.log('File name: ', file);
      console.log('File type: ', path.extname(file));
      console.log('File size: ', stats.size, 'bite');
    });
  });
});
