
export interface Community {
    communityId: number,
    communityUserId: number
    communityCategoryName: string
    content: string,
    userName: string,
    userImg: string,
    userCommentImg: string,
    likeCount: number,
    commentCount: number,
    reportsCount: number,
    isReport: boolean,
    isLike: boolean,
    isScrap: boolean,
    isUser: boolean,
    region: string,
    dishId: number,
    dishName: string,
    communityImgs: Array<string>,
    createdAt: string,
    modifiedAt: string
}

export interface Comment {
    commentId: number,
    userName: string,
    userImg: string,
    content: string,
    likeCount: number,
    isLike: boolean,
    isUser: boolean,
    createdAt: string,
    modifiedAt: string
}