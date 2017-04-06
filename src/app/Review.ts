export class Review{
    title: string;
    imgUrl: string;
    text: string;
    description: string;
    reviewer: string;
    timestamp: string;
    rating: number;
    
    reviewwall:{
        wallImgUrl: string;
        tagline: string;
        watchable: number;
        otherRatings:{
            reviewer: string;
            rating: number;
        }
    }

    memes:{
        memetext: string;
        memeImgUrl: string;
        claps: number;
    }

    comments:{
        userId: string;
        comment: string;
    }
}