export interface ICreateBookDTO {
  id?: string;
  title: string;
  author: string;
  status: string;
  finishedAt?: Date;
  rate?: number;
  userId: string;
}
