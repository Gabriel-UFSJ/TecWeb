import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Depoimentos } from './schemas/depoimentos.schema';
import mongoose from 'mongoose';

import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class DepoimentosService {
    constructor(
        @InjectModel(Depoimentos.name)
        private depoimentosModel: mongoose.Model<Depoimentos>,
    ) {}

    async findAll(query: Query): Promise<Depoimentos[]> {
        const resPerPage = 3;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            nome: {
                $regex: query.keyword,
                $options: 'i',
              },
            }
          : {};
        const depoimentos = await this.depoimentosModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return depoimentos;
    }

    async create(depoimentos: Depoimentos, user:User): Promise<Depoimentos> {
        const data = Object.assign(depoimentos, {user: user.id })

        const res = await this.depoimentosModel.create(depoimentos);
        return res;
    }

    async findById(id: string): Promise<Depoimentos> {
        const isValidId = mongoose.Types.ObjectId.isValid(id);

        const depoimentos = await this.depoimentosModel.findById(id);

        if (!isValidId) {
            throw new BadRequestException(`Id ${id} inválido`);
        }

        if (!depoimentos) {
            throw new NotFoundException(`Depoimentos com id ${id} não encontrado`);
        }

        return depoimentos;
    }

    async updateById(id: string, depoimentos:Depoimentos): Promise<Depoimentos> {
        return await this.depoimentosModel.findByIdAndUpdate(id, depoimentos,{
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Depoimentos> {
        return await this.depoimentosModel.findByIdAndDelete(id);
    }
}
