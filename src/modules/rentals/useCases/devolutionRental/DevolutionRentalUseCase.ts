import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRenstalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
  constructor(
    // constructor + private atribute - to access this. and all of ISpecificationsRepository's methods and vars
    @inject("RentalsRepository")
    private rentalsRepository: IRenstalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const dateNow = this.dateProvider.dateNow();

    // Quantidade de dias que o cliente ficou com o carro
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    // Mesmo que o usuário entregue o carro antes da diária mínima, o mesmo o valor mínimo que é 1 diária
    if (daily <= 0) {
      daily = minimum_daily;
    }

    // Comparação entre a data para entrega do carro e a data que o carro foi entregue de fato
    const delay = this.dateProvider.compareInDays(dateNow, rental.start_date);
    // Var iniciada como let e valor 0, pois a mesma assumirá valores dependendo das condições
    let total = 0;

    // Atraso sendo maior que zero, a multa será calculada sem valor mínimo
    if (delay > 0) {
      // Quantidade de dias em atraso(delay) vezes o valor da multa prevista
      const calculate_fine = delay * car.fine_amount;
      // total recebe o valor da multa
      total = calculate_fine;
    }
    // Valor da multa + a diária padrão(quantidade de dias vezes o valor da diária)
    total += daily * car.daily_rate;
    // Atualização do campo que leva a data do encerramento do aluguel
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    // Atualização da disponibilidade do carro para true, já que o mesmo foi entregue
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
