async function processFiles(files) {
  console.log('files type:', typeof files)
  console.log('files:', JSON.stringify(files))
  for (const file of files) {

    console.log('file:', file)
  }
}

const modifiedFiles = process.argv.slice(2);

const { added_files,
  copied_files,
  deleted_files,
  modified_files,
  renamed_files,
  type_changed_files,
  unmerged_files,
  unknown_files,
  all_changed_and_modified_files,
  all_changed_files,
  all_modified_files, } = process.env;

console.log('envs:', JSON.stringify({
  added_files,
copied_files,
deleted_files,
modified_files,
renamed_files,
type_changed_files,
unmerged_files,
unknown_files,
all_changed_and_modified_files,
all_changed_files,
all_modified_files,
}, null , 2))

processFiles(modifiedFiles);
