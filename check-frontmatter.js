async function processFiles(files) {
  console.log('files type:', typeof files)
  console.log('files:', JSON.stringify(files))
  files.forEach(file => {
    console.log('file:', file)
  })
}

const modifiedFiles = JSON.parse(process.env.FILES_CHANGED);

processFiles(modifiedFiles);
