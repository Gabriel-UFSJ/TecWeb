import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventoModule } from './evento/evento.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DepoimentosModule } from './depoimentos/depoimentos.module';
import { ImagensModule } from './imagens/imagens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    EventoModule,
    AuthModule,
    DepoimentosModule,
    ImagensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
