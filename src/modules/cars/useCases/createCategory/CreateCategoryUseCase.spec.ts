import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// Variáveis do "tipo" instância para que as mesmas sejam instanciadas dentro de "beforeEach"
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

// Suíte de testes
describe("Create Category", () => {
  // Instâncias chamadas de fato dentro de beforEach para que façam parte do contexto de todos testes
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    // Objeto criado para que os atributos name e description possam ser utilizados em mais de um caso
    const category = {
      name: "Category test",
      description: "Description category test",
    };
    // Criação de uma nova categoria com os atributos do objeto category acima
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    // Nome da nova categoria criada será armazenado em categoryCreated para ser usado no expect abaixo
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    // Toda categoria recebe um id de forma automática, logo se a mesma foi criada, terá um id
    // Caso nossa variável categoryCreated tenha a propriedade "id", significa que a categoria foi criada, retornando o sucesso do teste
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    // Objeto criado para que os atributos name e description possam ser utilizados em mais de um caso
    const category = {
      name: "Category test",
      description: "Description category test",
    };
    // Criação de uma nova categoria com os atributos do objeto category acima
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    await expect(
      // Criação de uma nova categoria com os mesmos atributos já criados acima para forçar o erro "Category Already Exists"
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
