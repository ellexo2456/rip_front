import { IAlpinist } from "../alpinist/typing";

export interface IGetExpeditionsResponse {
  expedition: IExpedition[];
}

export interface IExpedition {
  id: number;
  name: string;
  status: string;
  year: number;
  user: IUser;
  createdAt: string;
  formedAt: string;
  closedAt: string;
}

export interface IExpeditionWithAlpinists {
  id: number;
  name: string;
  status: string;
  year: number;
  createdAt: string;
  formedAt: string;
  closedAt: string;
  alpinists: IAlpinist[];
}

export interface IChangeExp {
  id: number;
  name: string;
  year: number;
}

interface IUser {
  id: number;
  Email: string;
}

export interface IGetExpeditionByIdResponse {
  expedition: IExpeditionWithAlpinists;
}
