import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepoimentosController } from './depoimentos.controller';
import { DepoimentosService } from './depoimentos.service';
import { DepoimentosSchema } from './schemas/depoimentos.schema'; // Certifique-se de importar o schema do modelo
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Depoimentos', schema: DepoimentosSchema }]), // Configure o modelo aqui
  ],
  controllers: [DepoimentosController],
  providers: [DepoimentosService],
})
export class DepoimentosModule {}
