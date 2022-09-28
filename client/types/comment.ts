import User from "./user";

type Comment = {
  id: number;
  authorId: number;
  author: User;
  text: string;
  createdAt: Date;
};

export default Comment;
