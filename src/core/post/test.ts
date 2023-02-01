import { readdir, readdirSync, readFileSync, stat, statSync, write } from 'fs';
import matter = require('gray-matter');
import { join } from 'path';
const marked = require('marked');

let dirPath = 'F:/WorkSpace/Front/projects/posts';

let dir = readdirSync(dirPath);
let ret = dir.map((v) => {
  let file = statSync(join(dirPath, v));
  let fileContent = readFileSync(join(dirPath, v), 'utf-8');

  const matterResult = matter(fileContent);
  // return {
  //   name: v.replace('.md', ''),
  //   updateTime: file.ctime,
  //   tags:
  //     typeof matterResult.data.tags === 'string'
  //       ? matterResult.data.tags.split('，')
  //       : [],
  //   description: matterResult.data.description || '',
  //   avatar:
  //     matterResult.data.avatar ||
  //     'https://blog.theodo.com/static/143db911c4c6eccc9d21965a1248feb0/a79d3/nestjs-admin-logo.png',
  // };
  return marked.parse(fileContent);
});
console.log(ret);
