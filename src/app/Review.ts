export class Review{
    _id: number;
    title: string;
    imgUrl: string;
    text: string;
    description: string;
    reviewer: string;
    timestamp: string;
    rating: number;
    
    reviewwall:ReviewWall;

    otherRatings: OtherRatings[];
    memes:Memes[];
    comments:Comments[];
}


export class ReviewWall {
    wallImgUrl: string;
    tagline: string;
    watchable: number;
   

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