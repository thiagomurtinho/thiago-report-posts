/**
 * TODO:
 * - [ ] Enviar edited_at para o supabase ao modificar arquivo
 * - [ ] Enviar edited_at junto com created_at para o supabase ao criar arquivo e com mesmo valor
 * - [ ] Enviar oublished_at para o supabase ao criar arquivo com draft false ou ao modificar arquivo para draft false
 */

import dotenv from "dotenv"
dotenv.config();

import { convertFrontmatter, convertStringToArray } from "./utils.mjs"
import { createPost, createPostTagFk, createTag, deletePost, searchTag, updatePost} from "./supabase.mjs"

const { added_files,
  deleted_files,
  modified_files,
  copied_files,
  renamed_files
} = process.env;

modified_files.concat(copied_files, renamed_files)

async function processPost() {
  if (added_files) {
    // const files = convertStringToArray(added_files);

    for (const file of added_files) {
      if (!file.endsWith(".md")) {
        continue;
      }

      const { post, tagList } = convertFrontmatter(file);

      const createdTags = [];
      for (const tag of tagList) {
        const { data: tagDB, error: tagError } = await createTag(tag);
        if (!tagDB) {
          console.log("Tag error:", tagError.details);
          continue;
        }
        createdTags.push(tagDB);
      }
      console.table(createdTags)


      const { data: postDB, erro: postError } = await createPost(post)
      if (!postDB) {
        console.log("Post error:", postError.details);
        continue;
      }
      const { id, post_id, created_at, title, path, series } = postDB[0]
      console.table([{
        id,
        post_id,
        created_at,
        title,
        path,
        series
      }])

      const tagsBD = []
      for (const tag of tagList) {
        const { data: tagDB, error: tagError } = await searchTag(tag)
        if (!tagDB) {
          console.log("Tag error:", tagError);
          continue;
        }
        tagsBD.push(...tagDB)
      }
      console.table(tagsBD)

      const posTagsFK = []
      for (const tag of tagsBD) {
        const { data, error: dataError } = await createPostTagFk(postDB[0].id, tag.id)
        if (!data) {
          console.log("Post Tag FK error:", dataError);
          continue;
        }
        posTagsFK.push(data[0])
      }
      console.table(posTagsFK)
    }
  }

  if (deleted_files) {
    // const files = convertStringToArray(deleted_files);

    const deletedsPost = []
    for (const file of deleted_files) {
      if (!file.endsWith(".md")) {
        continue;
      }
      const { post } = convertFrontmatter(file);

      const { data, error } = deletePost(post.post_id)

      if (!data) {
        console.log("Tag error:", error);
        continue;
      }
      const { id, post_id, created_at, title, path, series } = data[0]
      deletedsPost.push({ id, post_id, created_at, title, path, series })
    }
    console.table(deletedsPost)
  }

  if (modified_files) {
    // const files = convertStringToArray(modified_files);

    for (const file of modified_files) {
      if (!file.endsWith(".md")) {
        continue;
      }

      const { post, tagList } = convertFrontmatter(file);

      const createdTags = [];
      for (const tag of tagList) {
        const { data: tagDB, error: tagError } = await createTag(tag);
        if (!tagDB) {
          console.log("Tag error:", tagError.details);
          continue;
        }
        createdTags.push(tagDB);
      }
      console.table(createdTags)


      const { data: postDB, erro: postError } = await updatePost(post)
      if (!postDB) {
        console.log("Post error:", postError.details);
        continue;
      }
      const { id, post_id, created_at, title, path, series } = postDB[0]
      console.table([{
        id,
        post_id,
        created_at,
        title,
        path,
        series
      }])

      const tagsBD = []
      for (const tag of tagList) {
        const { data: tagDB, error: tagError } = await searchTag(tag)
        if (!tagDB) {
          console.log("Tag error:", tagError);
          continue;
        }
        tagsBD.push(...tagDB)
      }
      console.table(tagsBD)

      const posTagsFK = []
      for (const tag of tagsBD) {
        const { data, error: dataError } = await createPostTagFk(postDB[0].id, tag.id)
        if (!data) {
          console.log("Post Tag FK error:", dataError);
          continue;
        }
        posTagsFK.push(data[0])
      }
      console.table(posTagsFK)
    }
  }
}

processPost();
