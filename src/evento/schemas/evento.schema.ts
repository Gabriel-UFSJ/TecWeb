import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

@Schema({
    timestamps: true,
})
export class Evento {
    @Prop()
    nome: string;

    @Prop()
    descricao: string;

    @Prop()
    local: string;

    @Prop()
    data: Date;

    @Prop()
    hora: string;

    @Prop()
    valor: number;

    @Prop()
    criadoEm: Date;

    @Prop() 
    atualizadoEm: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const EventoSchema = SchemaFactory.createForClass(Evento);