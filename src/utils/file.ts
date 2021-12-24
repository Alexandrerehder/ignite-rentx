import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // Verifica se o arquivo existe no diretório
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  // Função responsável por remover o arquivo, caso o try dê certo
  await fs.promises.unlink(filename);
};
