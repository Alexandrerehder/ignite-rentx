import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    // Busca o usuário pelo ID
    const user = await this.usersRepository.findById(user_id);
    // Se existir um avatar para o ID
    if (user.avatar) {
      // Delete do avatar já existente
      await this.storageProvider.delete(user.avatar, "avatar");
    }
    // Adiciona o novo avatar na pasta correta
    await this.storageProvider.save(avatar_file, "avatar");

    // Atribui o novo avatar ao usuário em questão
    user.avatar = avatar_file;

    // Atualiza o usuário
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
