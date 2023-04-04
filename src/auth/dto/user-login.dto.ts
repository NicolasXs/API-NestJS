import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Por favor, informe um endereço de e-mail.' })
  @IsEmail({}, { message: 'O endereço de e-mail informado é inválido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Por favor, informe a senha.' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password: string;
}
