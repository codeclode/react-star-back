import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommentType } from 'src/graphql.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends Document {
  @Prop()
  user: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: false })
  isAnonymous: boolean;

  @Prop({
    enum: ['question', 'info', 'warning', 'suggestion'],
    default: 'info',
  })
  type: string;

  @Prop({
    type: Date,
    required: true,
  })
  publishTime: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
