import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test",
      description: "Desc Test",
      daily_rate: 100,
      license_plate: "License Test",
      fine_amount: 40,
      category_id: "1234",
      brand: "Ford",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1245",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there's another one registered for an user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1245211",
      expected_return_date: dayAdd24Hours,
      user_id: "1245",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1245",
        car_id: "12452",
        expected_return_date: dayAdd24Hours,
      })
      // Se o primeiro objeto possuir user_id igual ao segundo e sua propriedade end_date não estiver preenchida
      // Logo o carro não foi devolvido pelo usuário. O mesmo não pode alugar outro carro enquanto não devolver o atual
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able to create a rental if that car already registered", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1245",
      expected_return_date: dayAdd24Hours,
      user_id: "1245",
    });

    // Criação de 2 objetos com o mesmo car_id

    await expect(
      createRentalUseCase.execute({
        user_id: "12451",
        car_id: "1245",
        expected_return_date: dayAdd24Hours,
      })
      // Se o primeiro objeto possuir car_id igual ao segundo e sua propriedade end_date não estiver preenchida
      // Logo o carro não foi devolvido e não pode ser alugado por outro usuário
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });
  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "1245",
        car_id: "1245",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
