import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";

import { UserTokens } from "../entities/UserTokens";

// Implementação da interface IUsersTokensRepository para utilizar de seus métodos
class UsersTokensRepository implements IUsersTokensRepository {
  // Atribuindo a "repository" a classe Repository do TypeORM
  // A classe Repository contém métodos que lidam diretamente com as Entidades
  // Sendo possível adicionar, alterar, deletar, etc as tabelas que criamos por meio do mesmo TypeORM
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });
    await this.repository.save(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return usersTokens;
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const usersToken = await this.repository.findOne({
      refresh_token,
    });
    return usersToken;
  }
}

export { UsersTokensRepository };
