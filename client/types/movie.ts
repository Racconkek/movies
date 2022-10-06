import Comment from './comment';
import User from './user';

export interface Movie {
  id: number;
  authorId: number;
  usersWhoLike: User[];
  author: User;
  name: string;
  description: string;
  comments: Comment[];
  createdAt: string;
}

export interface MovieCreate {
  name: string;
  description: string;
}
