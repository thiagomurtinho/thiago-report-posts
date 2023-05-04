async function processFiles(files) {
  console.log('files type:', typeof files)
  console.log('files:', JSON.stringify(files))
  for (const file of files) {

    console.log('file:', file)
  }
}

const { added_files,
  copied_files,
  deleted_files,
  modified_files,
  renamed_files } = process.env;

processFiles();
