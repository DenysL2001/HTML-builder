const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'file.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function requestSaveText() {
  rl.question('Write text (For exit write exit): ', (inputText) => {
    if (inputText.toLowerCase() === 'exit') {
      rl.close();
    } else {
      fs.writeFile(filePath, inputText + '\n', { flag: 'a' }, (err) => {
        if (err) {
          console.log('Error!');
        } else {
          console.log('Text was save!');
        }
        requestSaveText();
      });
    }
  });
}
requestSaveText();
