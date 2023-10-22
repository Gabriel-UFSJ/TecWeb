import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Evento } from './schemas/evento.schema';

import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class EventoService {
    constructor(
        @InjectModel(Evento.name)
        private eventoModel: mongoose.Model<Evento>,
    ) {}

    async findAll(query: Query): Promise<Evento[]> {
        const resPerPage = 10;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            nome: {
                $regex: query.keyword,
                $options: 'i',
              },
            }
          : {};
        const eventos = await this.eventoModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return eventos;
    }

    async create(evento: Evento, user: User): Promise<Evento> {
        const data = Object.assign(evento, {user: user.id })

        const res = await this.eventoModel.create(evento);
        return res;
    }

    async findById(id: string): Promise<Evento> {
        const isValidId = mongoose.Types.ObjectId.isValid(id);

        const evento = await this.eventoModel.findById(id);

        if (!isValidId) {
            throw new BadRequestException(`Id ${id} inválido`);
        }

        if (!evento) {
            throw new NotFoundException(`Evento com id ${id} não encontrado`);
        }

        return evento;
    }

    async updateById(id: string, evento:Evento): Promise<Evento> {
        return await this.eventoModel.findByIdAndUpdate(id, evento,{
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Evento> {
        return await this.eventoModel.findByIdAndDelete(id);
    }
}
