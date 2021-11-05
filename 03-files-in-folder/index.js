const fs = require("fs");
const path = require('path')

const dir = path.join(__dirname, "secret-folder");

fs.readdir(dir, (err, files) => {
   if (err) throw err;

   for (const file of files) {

      const filePath = path.join(dir, file);

      fs.stat(filePath, (errStat, status) => {

         if (errStat) throw errStat;

         if (status.isFile()) {
            const { name, ext } = path.parse(filePath)
            console.log(`${name} - ${ext.slice(1)} - ${(status.size)}`)
         }
      });
   }
});