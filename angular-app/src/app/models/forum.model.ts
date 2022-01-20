export interface ForumPost {
    _id: number;
    title: string;
    content: string;
    author: string;
    date_published: string;
    comment: [number];
}
