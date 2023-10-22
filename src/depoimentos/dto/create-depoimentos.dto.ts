import { IsNotEmpty, IsString, IsDate, IsEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class CreateDepoimentosDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    criadoEm: String;

    @IsNotEmpty()
    @IsString()
    atualizadoEm: String;

    @IsEmpty({message: 'Não é necessário informar o usuário'})
    readonly user: User;

    image: Express.Multer.File;
}

