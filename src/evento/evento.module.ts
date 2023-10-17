import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';
import { EventoSchema } from './schemas/evento.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Evento', schema: EventoSchema }])
  ],
  controllers: [EventoController],
  providers: [EventoService]
})
export class EventoModule { }
