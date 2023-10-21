import {Controller, Get, Post, Param, Res, UploadedFile, UseGuards, UseInterceptors,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImagensService } from './imagens.service';
import { AuthGuard } from '@nestjs/passport';
import * as sharp from 'sharp';

@Controller('imagens')
export class ImagensController {
  constructor(private readonly imagensService: ImagensService) {}

  @Post('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('imagem'))
  async uploadImagem(@UploadedFile() imagem: Express.Multer.File): Promise<string> {
    // Redimensione a imagem para as dimensões desejadas (exemplo: 1920x1080)
    const resizedImageBuffer = await sharp(imagem.buffer)
      .resize(1920, 1080)
      .toBuffer();

    const fileName = await this.imagensService.uploadImagem({
      ...imagem,
      buffer: resizedImageBuffer, // Substitua o buffer original pela imagem redimensionada
    });

    return fileName;
  }

  @Get(':fileName')
  async downloadImagem(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
    const imagem = await this.imagensService.downloadImagem(fileName);

    if (!imagem) {
      res.status(404).send('Imagem não encontrada');
      return;
    }

    // Configurar os cabeçalhos de resposta para o tipo de conteúdo correto
    res.setHeader('Content-Type', 'image/*');

    // Escrever a imagem de volta na resposta
    res.send(imagem);
  }

  @Post('delete/:fileName')
  @UseGuards(/* Adicione seus guardas de autenticação aqui, se necessário */)
  async deleteImagem(@Param('fileName') fileName: string): Promise<void> {
    await this.imagensService.deleteImagem(fileName);
  }
}
