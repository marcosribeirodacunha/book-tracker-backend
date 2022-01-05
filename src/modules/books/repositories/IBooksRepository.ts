import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { Book } from "../infra/typeorm/entities/Book";

export interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
}
