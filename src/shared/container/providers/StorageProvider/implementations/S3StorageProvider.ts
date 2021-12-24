import upload from "@config/upload";
import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    // Recebe a representação do nome do arquivo upado
    const originalName = resolve(upload.tmpFolder, file);
    // Leitura do arquivo de fato - originalName
    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);
    // Função para upar o arquivo para o S3
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read", // Permissão
        Body: fileContent,
        ContentType, // Pré visualização
      })
      .promise();
    // Delete do arquivo inserido da pasta tmp
    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
