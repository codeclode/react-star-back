import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Comment,
  CommentPageLimit,
  CreateCommentInput,
} from 'src/graphql.schema';
import { CommentService } from './comment.service';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query('comments')
  async getAllComment(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Query('commentPage')
  async getCommentPage(
    @Args('commentPageLimit') args: CommentPageLimit,
  ): Promise<Comment[]> {
    return this.commentService.getCommentPage(args);
  }

  @Mutation('createComment')
  async createComment(
    @Args('createCommentInput') args: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.createComment(args);
  }
}
