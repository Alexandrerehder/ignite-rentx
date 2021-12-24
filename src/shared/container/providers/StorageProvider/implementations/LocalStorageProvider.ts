import upload from "@config/upload";
import fs from "fs";
import { resolve } from "path";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file), // Onde e qual arquivo buscar
      resolve(`${upload.tmpFolder}/${folder}`, file) // Pra onde e qual arquivo enviar
    );
    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      // Verifica se o arquivo existe no diretório
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    // Função responsável por remover o arquivo, caso o try dê certo
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
