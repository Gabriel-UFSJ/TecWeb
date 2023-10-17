import {Controller, Get, Post, Param, Res, UploadedFile, UseGuards, UseInterceptors,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImagensService } from './imagens.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('imagens')
export class ImagensController {
  constructor(private readonly imagensService: ImagensService) {}

  @Post('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('imagem'))
  async uploadImagem(@UploadedFile() imagem: Express.Multer.File): Promise<string> {
    const fileName = await this.imagensService.uploadImagem(imagem);
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
