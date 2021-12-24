import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @CreateDateColumn()
  image_name: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };
