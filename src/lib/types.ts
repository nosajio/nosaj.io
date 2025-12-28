export interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  excerpt?: string;
}

export interface Post extends PostMeta {
  content: string;
}
