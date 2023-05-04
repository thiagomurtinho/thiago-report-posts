/**
 * TODO:
 * - [ ] Modifie as vezes não cria tagsFK ⚠️
 * - [ ] Converter add e modified para create/update com pipne unica
 * - [ ] arraysCompare aceitar tags vazias []
 * - [ ] Unifircar post_id e id
 */

import dotenv from "dotenv";
import path from "path";
import { convertFrontmatter, convertStringToArray } from "./utils.mjs";
import { processApplyChanges, processDeletePost } from "./supabase.mjs";

dotenv.config();
const {
  added_files,
  deleted_files,
  modified_files,
  copied_files,
  renamed_files,
} = process.env;

const modified_files_all = [
  ...convertStringToArray(copied_files),
  ...convertStringToArray(renamed_files),
  ...convertStringToArray(modified_files),
  ...convertStringToArray(added_files),
];

async function processPost() {
  // if (added_files.length) {
  //   const files = convertStringToArray(added_files);
  //   console.log("🦄 Added files:", files);

  //   for (const file of files) {
  //     if (!file.endsWith(".md")) {
  //       continue;
  //     }
  //     const post = convertFrontmatter(file);
  //     const postApply = await processApplyChanges(post);
  //     console.table(postApply);
  //   }
  // }

  if (modified_files_all.length) {
    console.log("🦄 Modified files:", modified_files_all);
    const files = modified_files_all;

    for (const file of files) {
      if (!file.endsWith(".md")) {
        continue;
      }

      const post = convertFrontmatter(file);
      const postApply = await processApplyChanges(post);
      console.table(postApply);
    }
  }

  if (deleted_files.length) {
    const files = convertStringToArray(deleted_files);
    console.log("🦄 Deleted files:", files);

    for (const file of files) {
      if (!file.endsWith(".md")) {
        continue;
      }
      const alias = path.basename(file, ".md");
      const deleted = await processDeletePost(alias);
      console.table(deleted);
    }
  }
}

processPost();
