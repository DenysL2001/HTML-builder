const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'file.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function requestSaveText() {
  rl.question(
    'Hello, write text here plaese (For exit write exit): ',
    (inputText) => {
      if (inputText.toLowerCase() === 'exit') {
        console.log('Goodbye!');
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
    },
  );
}

rl.on('SIGINT', () => {
  console.log('\nGoodbye!');
  rl.close();
});

if (!fs.existsSync(filePath)) {
  try {
    fs.writeFileSync(filePath, '');
  } catch (err) {
    process.exit(1);
  }
}

requestSaveText();
