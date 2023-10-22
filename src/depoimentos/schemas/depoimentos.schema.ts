import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

@Schema({
    timestamps: true,
})
export class Depoimentos {

    @Prop()
    descricao: string;

    @Prop()
    nome: string;

    @Prop()
    criadoEm: String;

    @Prop() 
    atualizadoEm: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop() 
    image: string;
}

export const DepoimentosSchema = SchemaFactory.createForClass(Depoimentos);