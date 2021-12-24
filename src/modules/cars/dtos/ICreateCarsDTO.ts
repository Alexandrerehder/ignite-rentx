import { Specification } from "../infra/typeorm/entities/Specification";

// Data Transfer Object - classe que provê exatamente aquilo que é necessário para um determinado processo
interface ICreateCarsDTO {
  name: string;
  description: string;
  daily_rate: number; // Diária
  license_plate: string; // Placa
  fine_amount: number; // Multa
  brand: string; // Marca
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCarsDTO };
