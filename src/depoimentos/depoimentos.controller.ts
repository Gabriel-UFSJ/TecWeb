import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Depoimentos } from './schemas/depoimentos.schema';
import { DepoimentosService } from './depoimentos.service';
import { CreateDepoimentosDto } from './dto/create-depoimentos.dto';
import { UpdateDepoimentosDto } from './dto/update-depoimentos.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('depoimentos')
export class DepoimentosController {
    constructor(private depoimentosService: DepoimentosService) {}

    @Get()
    async getAllDepoimentos(@Query() query): Promise<Depoimentos[]> {
        return this.depoimentosService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createDepoimentos(
        @Body()
        depoimentos: CreateDepoimentosDto,
        @Req() req
    ): Promise<Depoimentos> {
        return this.depoimentosService.create(depoimentos, req.user);
    }

    @Get(':id')
    async getDepoimentos(
        @Param('id')
        id: string,
    ): Promise<Depoimentos> {
        return this.depoimentosService.findById(id);
    }

    @Put(':id')
    async updateDepoimentos(
        @Param('id')
        id: string,
        @Body()
        depoimentos: UpdateDepoimentosDto,
    ): Promise<Depoimentos> {
        return this.depoimentosService.updateById(id, depoimentos)
    }

    @Delete(':id')
    async deleteDepoimentos(
        @Param('id')
        id: string,
    ): Promise<Depoimentos> {
        return this.depoimentosService.deleteById(id);
    }
}
