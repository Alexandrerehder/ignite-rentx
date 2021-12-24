import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRenstalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRenstalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    // Se o carro passado como parâmetro existir e seu end_date não estiver preenchido - Não devolvido
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    // Se o usuário passado como parâmetro existir e o end_date não estiver preenchido - Não devolveu
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    // Criação de um novo Objeto
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  async findOpenRentalById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id && !rental.end_date);
  }
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}
export { RentalsRepositoryInMemory };
