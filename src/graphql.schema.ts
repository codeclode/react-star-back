
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum CommentType {
    question = "question",
    warning = "warning",
    info = "info",
    suggestion = "suggestion"
}

export enum PostType {
    chat = "chat",
    data_Visualization = "data_Visualization"
}

export class CreateCommentInput {
    user?: Nullable<string>;
    content: string;
    isAnonymous: boolean;
    type: CommentType;
    publishTime?: Nullable<Date>;
}

export class CommentPageLimit {
    pageNumber: number;
    pageSize: number;
}

export class PostPageLimit {
    postType?: Nullable<PostType>;
    searchKeyWord?: Nullable<string>;
    sortType?: Nullable<number>;
    pageNumber: number;
    pageSize: number;
}

export class PostFileName {
    name: string;
}

export abstract class IQuery {
    abstract comments(): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract commentPage(commentPageLimit?: Nullable<CommentPageLimit>): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract getPostInfoPage(postPageLimit?: Nullable<PostPageLimit>): Nullable<PostPage> | Promise<Nullable<PostPage>>;

    abstract getPostContent(postFileName?: Nullable<PostFileName>): Nullable<string> | Promise<Nullable<string>>;
}

export abstract class IMutation {
    abstract createComment(createCommentInput?: Nullable<CreateCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;
}

export class Comment {
    id: string;
    user?: Nullable<string>;
    content: string;
    isAnonymous: boolean;
    type: CommentType;
    publishTime?: Nullable<Date>;
}

export class PostInfo {
    name: string;
    updateTime?: Nullable<Date>;
    description?: Nullable<string>;
    avatar?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    type?: Nullable<PostType>;
}

export class PostPage {
    totalCount?: Nullable<number>;
    pageContent?: Nullable<Nullable<PostInfo>[]>;
}

type Nullable<T> = T | null;
