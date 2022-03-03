export interface ForumPost {
  _id: number;
  title: string;
  content: string;
  author: number;
  date_published: string;
  comment: [number];
}
