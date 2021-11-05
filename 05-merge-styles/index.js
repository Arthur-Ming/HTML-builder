const fs = require("fs");
const { writeFile, readdir, stat } = require("fs/promises");
const path = require('path')

const src = path.join(__dirname, "styles");
const dist = path.join(__dirname, "project-dist", 'bundle.css');

toBundle(src, dist, '.css')

async function toBundle(src, dist, ext) {

   await writeFile(dist, "");
   const files = await readdir(src);

   for (const file of files) {

      const srcFile = path.join(src, file);
      const status = await stat(srcFile);

      if (status.isFile() && path.extname(srcFile) === ext) {

         const stream = new fs.ReadStream(srcFile, { encoding: 'utf-8' });

         stream.on("readable", () => {
            const data = stream.read();
            if (data) {
               fs.appendFile(dist, data, (err) => {
                  if (err) throw err;
               });
            }
         });
      }
   }
}
