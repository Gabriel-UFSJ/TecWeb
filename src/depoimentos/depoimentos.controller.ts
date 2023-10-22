import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Depoimentos } from './schemas/depoimentos.schema';
import { DepoimentosService } from './depoimentos.service';
import { CreateDepoimentosDto } from './dto/create-depoimentos.dto';
import { UpdateDepoimentosDto } from './dto/update-depoimentos.dto';

import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('depoimentos')
export class DepoimentosController {
    constructor(private depoimentosService: DepoimentosService) {}

    @Get()
    async getAllDepoimentos(@Query() query): Promise<Depoimentos[]> {
        return this.depoimentosService.findAll(query);
    }

    @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Diretório onde as imagens serão armazenadas
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async createDepoimentos(
    @UploadedFile() image: Express.Multer.File,
    @Body() depoimentosDto: CreateDepoimentosDto,
    @Req() req,
  ): Promise<Depoimentos> {
    const depoimentos = {
      ...depoimentosDto,
      image: image.filename,
    };
    return this.depoimentosService.create(depoimentos, req.user);
  }

  @Get(':id')
  async getDepoimentos(
    @Param('id') id: string,
  ): Promise<Depoimentos> {
    return this.depoimentosService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Diretório onde as imagens serão armazenadas
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  async updateDepoimentos(
    @UploadedFile() image: Express.Multer.File, // Recuperar o arquivo enviado
    @Param('id') id: string,
    @Body() depoimentosDto: UpdateDepoimentosDto,
  ): Promise<Depoimentos> {
    const depoimentos = {
      ...depoimentosDto,
      image: image.filename,
    };
    return this.depoimentosService.updateById(id, depoimentos); // Passar o arquivo para o serviço, se necessário
  }

    @Delete(':id')
    async deleteDepoimentos(
        @Param('id')
        id: string,
    ): Promise<Depoimentos> {
        return this.depoimentosService.deleteById(id);
    }
}
