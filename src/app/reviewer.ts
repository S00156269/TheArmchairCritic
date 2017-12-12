import { Review } from './review';

export class Reviewer {
    Name: string;
    Bio: string;
    FaveGenres: string[];
    FaveMovies: string[];
    Reviews: {
        Review: Review[];
    }
}