export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostInput {
  userId: number;
  title: string;
  body: string;
}

export type CreatePostFormValues = Pick<CreatePostInput, 'title' | 'body'>;
export type PostField = keyof CreatePostFormValues;