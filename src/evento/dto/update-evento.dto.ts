import { IsNotEmpty, IsString, IsDate, IsNumber, IsEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class updateEventoDto{

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
    readonly data: string;

    @IsNotEmpty()
    @IsString()
    readonly hora: string;

    @IsNotEmpty()
    @IsString()
    readonly valor: string;

    @IsNotEmpty()
    @IsString()
    readonly criadoEm: string;

    @IsNotEmpty()
    @IsString()
    readonly atualizadoEm: string;

    @IsEmpty({message: 'Não é necessário informar o usuário'})
    readonly user: User;

    @IsNotEmpty()
    @IsString()
    image: string;

}