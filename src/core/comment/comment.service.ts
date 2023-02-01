import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Comment as qlComment,
  CommentPageLimit,
  CommentType,
  CreateCommentInput,
} from 'src/graphql.schema';
import { Comment, CommentDocument } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModal: Model<CommentDocument>,
  ) {}

  transformToQlComment(comment: Comment): qlComment {
    let ret: qlComment = new qlComment();
    ret.id = comment._id;
    ret.content = comment.content;
    ret.isAnonymous = comment.isAnonymous;
    ret.user = comment.user;
    ret.publishTime = comment.publishTime;
    ret.type = CommentType[comment.type];
    return ret;
  }

  async getCommentPage(pageInfo: CommentPageLimit): Promise<qlComment[]> {
    let comments: Array<Comment> = await this.commentModal
      .find()
      .sort({
        publishTime: 'desc',
      })
      .limit(pageInfo.pageSize)
      .skip((pageInfo.pageNumber - 1) * pageInfo.pageSize)
      .exec();
    return comments.map((v) => {
      return this.transformToQlComment(v);
    });
  }

  async findAll(): Promise<qlComment[]> {
    let comments: Array<Comment> = await this.commentModal.find().exec();
    return comments.map((v) => {
      return this.transformToQlComment(v);
    });
  }

  async createComment(commentInput: CreateCommentInput): Promise<qlComment> {
    const newCommment = new this.commentModal(commentInput);
    let comment = await newCommment.save();
    return this.transformToQlComment(comment);
  }
}
