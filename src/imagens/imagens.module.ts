import { Module } from '@nestjs/common';
import { ImagensController } from './imagens.controller';
import { ImagensService } from './imagens.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads'); // Define o diretório onde as imagens serão armazenadas
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`); // Define o nome do arquivo da imagem
        },
      }),
    }),
  ],
  controllers: [ImagensController],
  providers: [ImagensService],
})
export class ImagensModule {}
