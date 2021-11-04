const fs = require("fs");
const process = require('process');
const path = require('path')
const readline = require('readline');

const text = path.join(__dirname, 'text.txt')
const stream = new fs.WriteStream(text, { encoding: 'utf-8' });

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   prompt: 'Enter your text: '
});

rl.prompt();

rl.on('line', (input) => {
   if (input.trim() === 'exit') {
      rl.close();
      process.exit()
   }

   stream.write(input + '\n')

})
rl.on('close', () => {
   console.log('Goodbye!')
});
