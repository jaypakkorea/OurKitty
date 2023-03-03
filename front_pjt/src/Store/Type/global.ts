import { Comment } from "./communityType";

export interface Slice {
    content: Array<any>,
    empty: boolean,
    first: boolean;
    last: boolean;
    number: number,
    numberOfElements: number,
    pageable: object,
    size: number,
    sort: object,
}