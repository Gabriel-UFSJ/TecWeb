import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Para gerar nomes de arquivos únicos
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImagensService {
  private readonly uploadPath = './uploads'; // Diretório onde as imagens serão armazenadas

  async uploadImagem(file: Express.Multer.File): Promise<string> {
    const uniqueFileName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(this.uploadPath, uniqueFileName);

    // Salvar a imagem no diretório de uploads
    fs.writeFileSync(filePath, file.buffer);

    // Retornar o caminho relativo da imagem
    return uniqueFileName;
  }

  async downloadImagem(fileName: string): Promise<Buffer | null> {
    const filePath = path.join(this.uploadPath, fileName);

    try {
      // Ler o arquivo e retornar como um Buffer
      const data = fs.readFileSync(filePath);
      return data;
    } catch (error) {
      // Se o arquivo não for encontrado, retornar null
      return null;
    }
  }

  async deleteImagem(fileName: string): Promise<void> {
    const filePath = path.join(this.uploadPath, fileName);

    try {
      // Excluir o arquivo
      fs.unlinkSync(filePath);
    } catch (error) {
      // Lidar com erros de exclusão, se necessário
    }
  }
}
