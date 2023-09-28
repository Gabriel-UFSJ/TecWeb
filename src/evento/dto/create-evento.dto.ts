import { IsNotEmpty, IsString, IsDate, IsNumber, IsEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class createEventoDto{

    @IsNotEmpty()
    @IsString()
    readonly nome: string;

    @IsNotEmpty()
    @IsString()
    readonly descricao: string;

    @IsNotEmpty()
    @IsString()
    readonly local: string;

    @IsNotEmpty()
    @IsString()
    readonly data: Date;

    @IsNotEmpty()
    @IsString()
    readonly hora: string;

    @IsNotEmpty()
    @IsNumber()
    readonly valor: number;

    @IsNotEmpty()
    @IsString()
    readonly criadoEm: Date;

    @IsNotEmpty()
    @IsString()
    readonly atualizadoEm: Date;

    @IsEmpty({message: 'Não é necessário informar o usuário'})
    readonly user: User
}