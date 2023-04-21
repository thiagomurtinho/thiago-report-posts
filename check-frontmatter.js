require("dotenv").config();
const fs = require("fs");
const matter = require("gray-matter");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = `${process.env.SUPABASE_URL}`;
const supabaseKey = `${process.env.SUPABASE_KEY}`;

const supabase = createClient(supabaseUrl, supabaseKey);

async function processFiles(files) {
  for (const file of files) {
    if (!file.endsWith(".md")) {
      continue;
    }
    const content = fs.readFileSync(file, "utf8");
    const frontmatter = matter(content).data;
    const { tags } = frontmatter;
    const tagList = tags.map((tag) => ({ name: tag }));

    delete frontmatter.tags;

    // Cria tags ✅
    for (const tag of tagList) {
      const { data: tagsSb, error: tagsError } = await supabase
        .from("tags")
        .upsert([tag]);

      if (tagsError) console.log("tags error:", tagsError.details);
      if (tagsSb) console.log("tags:", tagsSb.name);
    }

    // Cria post ✅
    const { data: post, error: postError } = await supabase
      .from("posts")
      .upsert(frontmatter)
      .select("*")


    if (postError) {console.log("post error:", postError.details)}
    else {console.log("post:", post)};
    // if (post) console.log("post:", post);

    // Busca tags ✅
    const { data: tagsId, error: tagsIdError } = await supabase
      .from("tags")
      .select("id, name")
      .in("name", tags);

    if (tagsIdError) console.log("tags id error:", tagsIdError.details);
    if (tagsId) console.log("tags id:", tagsId);

    // Cria relação posts e tags ✅
    for (const tag of tagsId) {
      const { data: postTags, error: postTagsError } = await supabase
        .from("post_tags")
        .upsert([{ post_id: post[0].id, tag_id: tag.id }]);

      if (postTagsError) console.log("post tags error:", postTagsError.details);
      if (postTags) console.log("post tags:", postTags);
    }

    // Busca posts e tags ✅
    const { data: postsWithTags, error: postsWithTagsError } = await supabase
      .from("posts")
      .select("*, tags(name)");

    if (postsWithTagsError)
      console.log("posts with tags error:", postsWithTagsError);
    if (postsWithTags) {
      postsWithTags.map((post) => {
        post.tags = post.tags.map((tag) => tag.name);
      });
      console.log("posts with tags:", postsWithTags);
    }
  }
}

const modifiedFiles = process.argv.slice(2);

processFiles(modifiedFiles);
