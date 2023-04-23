async function processFiles(files) {
  console.log('files type:', typeof files)
  console.log('files:', JSON.stringify(files))
  for (const file of files) {

    console.log('file:', file)
  }
}

const modifiedFiles = process.argv.slice(2);

const { CHANGED_FILES } = process.env;

console.log('envs:', JSON.stringify(JSON.parse(CHANGED_FILES), null , 2))

processFiles(modifiedFiles);
