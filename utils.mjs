import fs from "fs";
import matter from "gray-matter";

export function convertFrontmatter(file) {
  try {
    const content = fs.readFileSync(file, "utf8");
    const post = matter(content).data;
    return post;
  } catch (error) {
    console.error(`Error converting frontmatter for file ${file}: ${error}`);
    throw error;
  }
}

export function convertStringToArray(str) {
  return JSON.parse(str.match(/\[(.*)\]/)[0].replace(/\\/g, ''));
}

export function arraysCompare(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  const names1 = array1.map(obj => obj.name).sort();
  const names2 = array2.map(obj => obj.name).sort();

  return names1.every((name, index) => name === names2[index]);
}
