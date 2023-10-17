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
    criadoEm: Date;

    @Prop() 
    atualizadoEm: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const DepoimentosSchema = SchemaFactory.createForClass(Depoimentos);