const fs = require("fs");
const path = require('path')

const src = path.join(__dirname, "styles");
const dist = path.join(__dirname, "project-dist");
const bundleCss = path.join(dist, 'bundle.css');

fs.mkdir(dist, { recursive: true }, err => {
   if (err) throw err;
});

fs.writeFile(bundleCss, "", (err) => {
   if (err) throw err;
});

fs.readdir(src, (err, files) => {
   if (err) throw err;

   for (const file of files) {

      const srcFile = path.join(src, file);

      fs.stat(srcFile, (errStat, status) => {

         if (errStat) throw errStat;

         const { ext } = path.parse(srcFile)
         if (status.isFile() && ext === '.css') {

            const stream = new fs.ReadStream(srcFile, { encoding: 'utf-8' });

            stream.on("readable", () => {
               const data = stream.read();
               if (data) {
                  fs.appendFile(bundleCss, data, (err) => {
                     if (err) throw err;
                  });
               }
            });
         }
      });
   }
});