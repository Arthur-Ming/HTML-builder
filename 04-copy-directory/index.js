const { mkdir, rm, readdir, copyFile } = require('fs/promises');
const path = require('path')

const dir = path.join(__dirname, "files");
const dirCopy = path.join(__dirname, "files-copy");

rm(dirCopy, { force: true, recursive: true }).then(() => {
   copyDir(dir, dirCopy)
})

async function copyDir(dir, dirCopy) {

   await mkdir(dirCopy, { recursive: true });

   const files = await readdir(dir, { withFileTypes: true });

   for (const file of files) {

      const filePath = path.join(dir, file.name);
      const copyFilePath = path.join(dirCopy, file.name);

      if (file.isFile()) {
         try {
            await copyFile(filePath, copyFilePath)
         } catch (error) {
            throw error
         }
      }
      if (file.isDirectory()) {

         copyDir(filePath, copyFilePath)
      }
   }
}
