export interface ICreateTask {
  title: string;
  date: Date;
  desc: string;
  important: boolean;
}

export interface IUpdateTask {
  title?: string;
  date?: Date;
  completed?: boolean;
  desc?: string;
  important?: boolean;
}

interface IUser {
  _id: string;
  ownerId: string;
  name: string;
  price: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  name: string;
  img: any;
}

export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IUpdateUser {
  password?: string;
  name?: string;
}
