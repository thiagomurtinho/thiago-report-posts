import fs from "fs";
import matter from "gray-matter";

export function convertFrontmatter(file) {
  const content = fs.readFileSync(file, "utf8");
  const frontmatter = matter(content).data;
  const { tags } = frontmatter;
  const tagList = tags.map((tag) => ({ name: tag }));

  delete frontmatter.tags;

  return { post, tagList };
}


export function convertStringToArray(str) {
  const arrayJSON = JSON.parse(str.match(/"(.*)"/)[1]);
  return JSON.parse(arrayJSON[0]);
}
