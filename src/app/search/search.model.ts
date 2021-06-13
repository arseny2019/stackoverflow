export interface User {
  user_id: number;
  display_name: string;
}

export interface Question {
  tags: string[];
  owner: User;
  view_count: number;
  answer_count: number;
  question_id: number;
  title: string;
}

export interface ArchiveQuestionResponse {
  items: DetailQuestion[] | Question[];
  has_more: boolean;
}

export interface DetailQuestion {
  tags: string[];
  answers: Answer[];
  owner: User;
  view_count: number;
  answer_count: number;
  creation_date: number;
  question_id: number;
  title: string;
  body: string;
}

export interface Answer {
  owner: User;
  creation_date: number;
  answer_id: number;
  question_id: number;
  title: string;
  body: string;
}

export enum PanelType {
  None = 'none',
  Author = 'author',
  Tag = 'tag'
}

export interface QueryParams {
  title?: string;
  tagged?: string;
  page?: number,
  pagesize?: number,
  site: string;
  key: string;
  filter?: string;
  order?: string;
  sort?: string
}

export interface PanelQueryParams {
  type: PanelType,
  param: string | User
}

export interface ArchiveQuestionResponseByAuthor extends ArchiveQuestionResponse {
  owner: User
}
