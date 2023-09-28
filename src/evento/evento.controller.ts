import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Evento } from './schemas/evento.schema';
import { EventoService } from './evento.service';
import { createEventoDto } from './dto/create-evento.dto';
import { updateEventoDto } from './dto/update-evento.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';


@Controller('evento')
export class EventoController {
    constructor(private eventoService: EventoService){}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Evento[]> {
        return this.eventoService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createEvento(
        @Body()
        evento: createEventoDto,
        @Req() req 
    ): Promise<Evento> {
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
    async updateEvento(
        @Param('id')
        id: string,
        @Body()
        evento: updateEventoDto,
    ): Promise<Evento> {
        return this.eventoService.updateById(id, evento)
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
