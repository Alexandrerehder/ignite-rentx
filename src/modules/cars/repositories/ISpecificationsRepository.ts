import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateSpeficicationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpeficicationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpeficicationDTO };
