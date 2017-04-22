export class Review{
    title: string;
    imgUrl: string;
    text: string;
    description: string;
    reviewer: string;
    timestamp: string;
    rating: number;
    
    reviewwall:ReviewWall;

    memes:Memes[];

    comments:Comments[];
}


export class ReviewWall {
    wallImgUrl: string;
    tagline: string;
    watchable: number;
    otherRatings:OtherRatings[];

}

export class OtherRatings{
    reviewer= '';
    rating= '';
    otherReviewImgUrl= '';

}

export class Memes{
    memetext: string;
    memeImgUrl: string;
    claps: number;

}

export class Comments{
    userId: string;
    comment: string;

}