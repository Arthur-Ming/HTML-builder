const fs = require('fs');
const path = require('path')
const text = path.join(__dirname, 'text.txt')

fs.readFile(text, 'utf8', (error, data) => {
   if (error) {
      throw error
   }

   console.log(data)
})