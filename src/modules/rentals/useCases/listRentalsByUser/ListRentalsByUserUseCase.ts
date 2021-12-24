import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRenstalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    // constructor + private atribute - to access this. and all of ISpecificationsRepository's methods and vars
    @inject("RentalsRepository")
    private rentalsRepository: IRenstalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
