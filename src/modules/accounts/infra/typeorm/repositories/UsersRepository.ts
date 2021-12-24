import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

// Implementação da interface IUsersRepository para utilizar de seus métodos
class UsersRepository implements IUsersRepository {
  // Atribuindo a "repository" a classe Repository do TypeORM
  // A classe Repository contém métodos que lidam diretamente com as Entidades
  // Sendo possível adicionar, alterar, deletar, etc as tabelas que criamos por meio do mesmo TypeORM
  private repository: Repository<User>;

  constructor() {
    // Cada entidade tem seu próprio repositório e pode ser acessada através de "getRepository"
    // repository passa a representar a Entidade User, que representa nossa tabela "users"
    // Qualquer método atrelado a repository refletirá na tabela User
    this.repository = getRepository(User);
  }
  // Recebe atributos definidos na Interface ICreateUserDTO
  async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: // retorna uma Promise sem retorno
  ICreateUserDTO): Promise<void> {
    // Através de métodos da lib TypeORM, realiza a criação de um novo user
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });
    // Salva o objeto criado acima (user) na entidade User
    await this.repository.save(user); // Pode ser feito com QueryBuilder
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }
}

export { UsersRepository };
