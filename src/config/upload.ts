import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  // diskStroge permite passar infos de como e onde salvaremos os arquivos em questão
  storage: multer.diskStorage({
    // Configuração de destino
    destination: tmpFolder,
    filename: (request, file, callback) => {
      // Criamos um Hash e aramazenamos
      const fileHash = crypto.randomBytes(16).toString("hex");
      // Usamos o Hash criado para concatenar com o nome original, evitando duplicatas
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
