import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./User";

@Entity("users_tokens") // Deve ser exatamente igual ao nome da tabela
class UserTokens {
  @PrimaryColumn()
  id?: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  // Criação de um objeto apontando para a entidade. O Objeto é usado no método ..
  @ManyToOne(() => User) // Muitos tokens para 1 user
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserTokens };
