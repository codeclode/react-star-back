import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [ConfigModule],
  providers: [PostService, PostResolver],
})
export class PostModule {}
