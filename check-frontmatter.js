async function processFiles(files) {
  console.log('files:', files)
  for (const file of files) {
    console.log('file:', file)
  }
}

const modifiedFiles = process.argv.slice(2);

processFiles(modifiedFiles);
