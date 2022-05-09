export interface ForumPost {
  _id: number;
  title: string;
  content: string;
  author?: number;
  authorname?: string;
  vote_count?: number;
  date_published: Date;
  comment: [number];
}
