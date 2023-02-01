import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  PostFileName,
  PostInfo,
  PostPage,
  PostPageLimit,
} from 'src/graphql.schema';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('getPostInfoPage')
  async getPostInfoPage(
    @Args('postPageLimit') args: PostPageLimit,
  ): Promise<PostPage> {
    let ret = await this.postService.getPostInfoPage(args);
    return ret;
  }

  @Query('getPostContent')
  async getPostContent(
    @Args('postFileName') args: PostFileName,
  ): Promise<string> {
    return this.postService.getPostContent(args);
  }
}
