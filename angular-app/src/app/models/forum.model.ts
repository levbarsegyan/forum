import { HexBase64BinaryEncoding } from 'crypto';
export interface ForumPost {
    _id: number;
    title: string;
    content: string;
    author: string;
    date_published: string;
}
