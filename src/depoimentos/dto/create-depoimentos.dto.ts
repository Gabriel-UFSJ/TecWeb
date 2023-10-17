import { IsNotEmpty, IsString, IsDate, IsEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class CreateDepoimentosDto {
    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsDate()
    criadoEm: Date;

    @IsNotEmpty()
    @IsDate()
    atualizadoEm: Date;

    @IsEmpty({message: 'Não é necessário informar o usuário'})
    readonly user: User
}

