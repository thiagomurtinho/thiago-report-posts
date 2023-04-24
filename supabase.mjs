/**
 * TODO:
 * - [ ] Mudar id no supabase para não ser gerado e receber o local
 * - [ ] Mudar nome do frontmatter de post_id para id
 * - [ ] Mudar created_at no supabase para timestampz
 */
import { createClient} from "@supabase/supabase-js"
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = `${process.env.SUPABASE_URL}`;
const supabaseKey = `${process.env.SUPABASE_KEY}`;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getPost(post_id) {
  return await supabase.from("posts").select("*, tags(name)").match({ post_id:`${post_id}` });
}

export async function createPost(post) {
  return await supabase.from("posts").insert(post).select();
}

export async function updatePost(post) {
  return await supabase.from("posts").update(post).eq("post_id", post.post_id).select();
}

export async function deletePost(post_id) {
  return await supabase.from("posts").delete().eq("post_id", post_id).select();
}

export async function createTag(tag) {
  return await supabase.from("tags").insert( { name: tag }).select();
}

export async function deleteTag(tagName) {
  return await supabase.from("post_tags").delete().eq("name", tagName).select();
}

export async function searchTag(tag) {
  return await supabase.from("tags").select("id, name").eq("name", tag);
}

export async function createPostTagFk(post_id, tag_id) {
  return await supabase.from("post_tags").upsert([{ post_id: post_id, tag_id: tag_id }]).select();
}
