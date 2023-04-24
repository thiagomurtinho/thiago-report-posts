import fs from "fs";
import matter from "gray-matter";

export function convertFrontmatter(file) {
  try {
    const content = fs.readFileSync(file, "utf8");
    const post = matter(content).data;
    const { tags } = post;
    const tagList = tags.map((tag) => ({ name: tag }));
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
