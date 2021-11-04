const fs = require("fs");
const path = require('path')

const dir = path.join(__dirname, "files");
const dirCopy = path.join(__dirname, "files-copy");

fs.mkdir(dirCopy, { recursive: true }, err => {
   if (err) throw err;
});

fs.readdir(dir, { withFileTypes: true }, (err, files) => {
   if (err) throw err;

   for (const file of files) {

      const filePath = path.join(dir, file.name);
      const copyFilePath = path.join(dirCopy, file.name);

      if (file.isFile()) {
         fs.copyFile(filePath, copyFilePath, err => {
            if (err) throw err;
         })
      }
   }
});




