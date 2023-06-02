export type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  password: string;
  profession: string;
  image: string;
  redesLinks: Link[];
  createdAt: Date;
  updatedAt: Date;
};

export type Link = {
  id: number;
  url: string;
  userId: number;
  user: User;
  title: string;
};

export type Login = {
  email: string;
  password: string;
};
