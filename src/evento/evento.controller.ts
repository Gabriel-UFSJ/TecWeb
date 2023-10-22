import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Evento } from './schemas/evento.schema';
import { EventoService } from './evento.service';
import { createEventoDto } from './dto/create-evento.dto';
import { updateEventoDto } from './dto/update-evento.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('evento')
export class EventoController {
    constructor(private eventoService: EventoService) { }

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Evento[]> {
        return this.eventoService.findAll(query);
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
    async createEvento(
        @UploadedFile() image: Express.Multer.File,
        @Body() eventoDto: createEventoDto,
        @Req() req
    ): Promise<Evento> {

        const evento = {
            ...eventoDto,
            image: image.filename,
        };
        return this.eventoService.create(evento, req.user)
    }

    @Get(':id')
    async getEvento(
        @Param('id')
        id: string,
    ): Promise<Evento> {
        return this.eventoService.findById(id);
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
    async updateEvento(
        @UploadedFile() image: Express.Multer.File, // Recuperar o arquivo enviado
        @Param('id') id: string,
        @Body() eventoDto: updateEventoDto,
    ): Promise<Evento> {

        const evento = {
            ...eventoDto,
            image: image.filename,
        }
        return this.eventoService.updateById(id, evento); // Passar o arquivo para o serviço, se necessário
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteEvento(
        @Param('id')
        id: string,
    ): Promise<Evento> {
        return this.eventoService.deleteById(id);
    }
}
