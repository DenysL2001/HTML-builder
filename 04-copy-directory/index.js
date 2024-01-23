const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

const copyFiles = async () => {
  try {
    await fs.mkdir(targetDir, {
      recursive: true,
    });
    const files = await fs.readdir(sourceDir);
    await Promise.all(
      files.map(async (file) => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        await fs.copyFile(sourcePath, targetPath);
      }),
    );
  } catch (err) {
    console.log('Error', err);
  }
};

copyFiles();

fs.watch(sourceDir, { recursive: true }, async (eventType, filename) => {
  try {
    console.log(`File ${filename} was changed.`);
    await copyFiles();
  } catch (err) {
    console.log('Error!', err);
  }
});
