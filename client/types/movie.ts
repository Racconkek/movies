import Comment from './comment';
import User from './user';
import { Tag } from "./tag";

export interface Movie {
  id: number;
  authorId: number;
  usersWhoLike: User[];
  author: User;
  name: string;
  description: string;
  comments: Comment[];
  tags: Tag[];
  createdAt: string;
}

export interface MovieCreate {
  name: string;
  description: string;
  tags: Tag[];
}
