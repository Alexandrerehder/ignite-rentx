import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    // Criação de um objeto user para ser usado na criação e na autenticação
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "rehdera@test.com",
      name: "Rehdera Test",
      password: "123456",
    };
    // Criação de um usuário a partir do objeto acima(user)
    await createUserUseCase.execute(user);
    // Autenticação com base no email e password do objeto(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    // Após a autenticação de um usuário, o mesmo recebe um token de forma automática(regra de negócio)
    // Logo se o mesmo foi autenticado, terá uma propriedade token que fará com que o teste retorne sucesso
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      // Utilização do método execute dentro do contexto de autenticação(authenticateUserUseCase)
      // passando os parâmetros esperados(email/senha) com informações incorretas(inexistentes)
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "171pass",
      })
    ).rejects.toEqual(new AppError("User or password incorrect"));
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    // Criação de um novo usuário para este contexto de testes - Posteriormente teremos apenas um reaproveitável
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "rehdera@test.com",
      name: "Rehdera Test",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(
      // Utilização do método execute dentro do contexto de autenticação(authenticateUserUseCase)
      // passando os parâmetros esperados(email/senha) com email correto e senha incorreta
      authenticateUserUseCase.execute({
        email: user.email,
        password: "171pass",
      })
    ).rejects.toEqual(new AppError("User or password incorrect"));
  });
});
