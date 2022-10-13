import User from "./user";

export interface Tag {
  id: string;
  authorId: string;
  author: User;
  name: string;
  color: string;
}