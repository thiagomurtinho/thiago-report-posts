import fs from "fs";
import matter from "gray-matter";

// export function convertFrontmatter(file) {
//   const content = fs.readFileSync(file, "utf8");
//   const frontmatter = matter(content).data;
//   const { tags } = frontmatter;
//   const tagList = tags.map((tag) => ({ name: tag }));

//   delete frontmatter.tags;

//   return { post, tagList };
// }

export function convertFrontmatter(file) {
  console.log("🚀 ~ file: utils.mjs:16 ~ convertFrontmatter ~ file:", file)
  try {
    const content = fs.readFileSync(file, "utf8");
    console.log("🚀 ~ file: utils.mjs:19 ~ convertFrontmatter ~ content:", content)
    const post = matter(content).data;
    console.log("🚀 ~ file: utils.mjs:21 ~ convertFrontmatter ~ post:", post)
    const { tags } = post;
    const tagList = tags.map((tag) => ({ name: tag }));
    console.log("🚀 ~ file: utils.mjs:24 ~ convertFrontmatter ~ tagList:", tagList)

    delete post.tags;

    return { post, tagList };
  } catch (error) {
    console.error(`Error converting frontmatter for file ${file}: ${error}`);
    throw error;
  }
}


export function convertStringToArray(str) {
  return JSON.parse(str.match(/\[(.*)\]/)[0].replace(/\\/g, ''));
}
