import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o nome do usuário' })
  name: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'O e-mail informado deve ser valido' })
  email: string;
  @ApiProperty({ required: false })
  telefone?: string;
}
