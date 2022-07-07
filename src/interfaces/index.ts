export enum switchTheme {
  dark = "dark",
  light = "light",
}

export enum switchlanguage {
  en = "en",
  ru = "ru",
}

export enum collectionTypes {
  car = "car",
  book = "book",
  knife = "knife",
  currency = "currency",
  pen = "pen",
}

export interface IUser {
  id?: number;
  email: string;
  name: string;
  password?: string;
  theme: switchTheme.dark | switchTheme.light;
  language: switchlanguage.en | switchlanguage.ru;
  blocked?: boolean | null;
  admin?: boolean | null;
  Collections: ICollection[];
}

export interface ICollection {
  id?: number;
  User: IUser;
  name: string;
  AdditionalField: AdditionalField;
  description: string;
  theme: switchTheme.dark | switchTheme.light;
  image: string | null;
  fields: string | null;
  UserId: number;
  Items: IItem[];
  tags?: ITag[];
  createdAt: string;
  updatedAt: string;
}

export interface AdditionalField {
  number_1?: number;
  number_2?: number;
  number_3?: number;
  string_1?: string;
  string_2?: string;
  string_3?: string;
  boolean_1?: boolean;
  boolean_2?: boolean;
  boolean_3?: boolean;
  text_1?: string;
  text_2?: string;
  text_3?: string;
  date_1?: string;
  date_2?: string;
  date_3?: string;
}

export interface IItem {
  AdditionalFieldsValue: any;
  id: number;
  CollectionId: number;
  Tags: ITag[];
  Collection: ICollection;
  additionalFields: string;
  image: string;
  Likes: ILike[];
  Comments: IComment[];
  name: string;
}

export interface ILike {
  id: number;
  UserId: number;
  ItemId: number;
}

export interface IComment {
  id: number;
  UserId: number;
  ItemId: number;
  text: string;
  createdAt: string;
}

export interface ITag {
  id?: number;
  name: string;
  theme: string;
}

export interface IUserData {
  user: IUser;
  accessToken: string;
}
