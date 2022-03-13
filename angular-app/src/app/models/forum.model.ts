export interface ForumPost {
  _id: number;
  title: string;
  content: string;
  author?: number;
  authorname?: string;
  date_published: string;
  comment: [number];
}
