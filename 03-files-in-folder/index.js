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
        console.log('Error!', statErr);
        return;
      }

      if (stats.isFile()) {
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        console.log(
          `${fileNameWithoutExt} - ${path.extname(file).slice(1)} - ${stats.size} bytes`,
        );
      }
    });
  });
});
