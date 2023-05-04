/**
 * TODO:
 * - [ ] Mudar id no supabase para não ser gerado e receber o local
 * - [ ] Mudar nome do frontmatter de post_id para id
 * - [ ] Mudar created_at no supabase para timestampz
 */
import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = `${process.env.SUPABASE_URL}`;
const supabaseKey = `${process.env.SUPABASE_KEY}`;

const supabase = createClient(supabaseUrl, supabaseKey);

function tryCatch(callBack) {
  return async function (...args) {
    try {
      return await callBack(...args);
    } catch (err) {
      console.error(`Error in ${callBack.name}: \n`, err);
      throw new Error(err);
    }
  };
}

async function _createTags(tags) {
  let createTags = [];
  const uniqueTags = [...new Set(tags)]; // Remove duplicate tags
  const { data: existingTags, error: existingTagsError } = await supabase
    .from("tags")
    .select("id, name")
    .in("name", uniqueTags); // Get existing tags to prevent duplicates
  if (existingTagsError) {
    if (existingTagsError.code === "23505") {
      console.warn("Duplicate post detected.");
      return {};
    } else throw existingTagsError;
  }

  createTags = existingTags;

  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTags = uniqueTags.filter((tag) => !existingTagNames.includes(tag)); // Filter out tags that already exist

  if (newTags.length) {
    const { data: createdTags, error: createdTagsError } = await supabase
      .from("tags")
      .insert(newTags.map((name) => ({ name })))
      .select();
    if (createdTagsError) {
      // Check if the error is a duplicate key violation
      if (createdTagsError.code === "23505") {
        console.warn("Duplicate tags were detected and ignored.");
        return createTags;
      }
      throw createdTagsError;
    }

    createTags = [...createTags, ...createdTags];
  }

  return createTags;
}

async function _createPostTags(postId, tags) {
  if (!tags.length) throw new Error("No tags to create");
  if (!postId) throw new Error("No post id");

  const postTags = tags.map((tag) => ({
    post_id: postId,
    tag_id: tag.id,
  }));

  const { error } = await supabase.from("post_tags").insert(postTags);
  if (error) throw new Error(JSON.stringify(error, null, 2));

  return postTags;
}
async function _deletePostTags(postId) {
  if (!postId) throw new Error("No post id to delete post_tags rows");

  const { data, error } = await supabase
    .from("post_tags")
    .delete()
    .eq("post_id", postId)
    .select();
  if (error) {
    console.warn("No data returned from delete query in post_tags.");
    throw error;
  }

  return data;
}

async function modifierPostData(post) {
  try {
    if (!post) throw new Error("No post to create");
    const tags = post.tags;
    delete post.tags;
    let dataDb = null;

    const { data, error, count } = await supabase
      .from("posts")
      .insert(post)
      .select();
    if (error) {
      if (error.code === "23505") {
        console.warn("Duplicate post detected. Start update.");
        const edited_at = new Date().toISOString().replace("Z", "+00:00");
        const { data: postUpdated, error: errorPostUpdated } = await supabase
          .from("posts")
          .update({ ...post, edited_at })
          .eq("id", post.id)
          .select();
        if (errorPostUpdated) throw errorPostUpdated;

        _deletePostTags(post.id);

        dataDb = postUpdated[0];
      } else throw error;
    } else {
      dataDb = data[0];
    }

    if (!dataDb) {
      console.warn("No data returned from insert query.");
      return {};
    }

    const newTags = await _createTags(tags);

    await _createPostTags(dataDb.id, newTags);

    dataDb.tags = tags;

    return dataDb;
  } catch (error) {
    console.error(error);
  }
}

async function deletePost(alias) {
  const { data, error } = await supabase
  .from("posts")
  .delete()
  .match({ alias })
  .select();

  if (error) throw JSON.stringify(error, null, 2);

  return data;
}

export async function deleteAllTags() {
  const { data, error } = await supabase
    .from("tags")
    .delete()
    .is("description", null)
    .select();
  if (error) {
    console.log("Delete error:", error);
  }
  console.table("Delete tags", data);
}

export async function getPost() {
    const { data, error } = await supabase.from("posts").select();
    if (error) {
        console.log("Select error:", error);
    }
    console.table("Select posts", data);
}

export async function getPostsInfos() {
    const { data, error } = await supabase.from("posts").select("id, alias, title, description, tags");
    if (error) {
        console.log("Select error:", error);
    }
    console.table("Select posts", data);
}

export const processApplyChanges = tryCatch(modifierPostData);
export const processDeletePost = tryCatch(deletePost);
