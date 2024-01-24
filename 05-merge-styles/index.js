const fs = require('fs');
const path = require('path');
const writableStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  { flags: 'w' },
);

const readAndWriteFile = (fileName) => {
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(
      path.join(__dirname, 'styles', fileName),
      'utf-8',
    );
    readableStream.on('end', resolve);
    readableStream.on('error', reject);
    readableStream.pipe(writableStream, { end: false });
  });
};

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  async (error, data) => {
    if (error) throw error;

    const cssFiles = data
      .filter((file) => file.isFile() && path.extname(file.name) === '.css')
      .map((file) => file.name);

    try {
      await Promise.all(cssFiles.map(readAndWriteFile));

      writableStream.end();
      console.log('Files successfully compiled in bundle.css!');
    } catch (err) {
      console.error('Error!', err);
    }
  },
);
