import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdir, readdirSync, readFileSync, Stats, statSync } from 'fs';
import matter = require('gray-matter');
import { join } from 'path';
import {
  PostFileName,
  PostInfo,
  PostPage,
  PostPageLimit,
  PostType,
} from 'src/graphql.schema';
const marked = require('marked');

@Injectable()
export class PostService {
  private postsDir: string = null;
  constructor(private configService: ConfigService) {
    this.postsDir = configService.get<string>('POSTDIR');
  }

  getInfo(dir: Array<string>, index): PostInfo {
    if (dir.length <= index) {
      return null;
    } else {
      let file = statSync(join(this.postsDir, dir[index]));
      let fileContent = readFileSync(join(this.postsDir, dir[index]), 'utf-8');
      const matterResult = matter(fileContent);
      let newPostInfo = new PostInfo();

      newPostInfo.name = dir[index].replace('.md', '');
      newPostInfo.updateTime = file.ctime;
      newPostInfo.tags =
        typeof matterResult.data.tags === 'string'
          ? matterResult.data.tags.split('，')
          : [];
      newPostInfo.avatar =
        matterResult.data.avatar ||
        'https://blog.theodo.com/static/143db911c4c6eccc9d21965a1248feb0/a79d3/nestjs-admin-logo.png';
      newPostInfo.description = matterResult.data.description || '';
      newPostInfo.type = dir[index].startsWith('1')
        ? PostType.chat
        : PostType.data_Visualization;
      return newPostInfo;
    }
  }

  getContent(fileName: string): string {
    let dir = readdirSync(this.postsDir);
    fileName = fileName + '.md';
    if (!dir.includes(fileName)) {
      return '<h1>暂无此文章🗡</h1>';
    } else {
      let fileContent = readFileSync(join(this.postsDir, fileName), 'utf-8');
      return marked.parse(fileContent);
    }
  }

  getSortedDir(
    isAll: boolean = true,
    isChat: boolean = false,
    sortType = 0,
    searchKeyWord = '',
  ): Array<string> {
    let dir = readdirSync(this.postsDir);
    dir = dir.filter((v) => {
      if (searchKeyWord !== '' && !v.includes(searchKeyWord)) return false;
      if (isAll) return true;
      return isChat ? v.startsWith('chat_') : !v.startsWith('chat_');
    });
    if (sortType !== 0) {
      dir.sort((a, b) => {
        let filea: Stats = statSync(join(this.postsDir, a));
        let fileb: Stats = statSync(join(this.postsDir, b));
        return sortType === 1
          ? Number(fileb.ctime) - Number(filea.ctime)
          : Number(filea.ctime) - Number(fileb.ctime);
      });
    }
    return dir;
  }

  async getPostInfoPage(postPageLimit: PostPageLimit): Promise<PostPage> {
    let i = 0;
    let dir: Array<string>;
    if (!postPageLimit.postType) {
      dir = this.getSortedDir(
        true,
        false,
        postPageLimit.sortType,
        postPageLimit.searchKeyWord,
      );
    } else if (postPageLimit.postType === PostType.chat) {
      dir = this.getSortedDir(
        false,
        true,
        postPageLimit.sortType,
        postPageLimit.searchKeyWord,
      );
    } else {
      dir = this.getSortedDir(
        false,
        false,
        postPageLimit.sortType,
        postPageLimit.searchKeyWord,
      );
    }
    let ret: Array<PostInfo> = [];
    while (
      (postPageLimit.pageNumber - 1) * postPageLimit.pageSize + i <
        dir.length &&
      i < postPageLimit.pageSize
    ) {
      ret.push(
        this.getInfo(
          dir,
          (postPageLimit.pageNumber - 1) * postPageLimit.pageSize + i,
        ),
      );
      i++;
    }
    return {
      totalCount: dir.length,
      pageContent: ret,
    };
  }

  async getPostContent(filename: PostFileName): Promise<string> {
    return this.getContent(filename.name);
  }
}
