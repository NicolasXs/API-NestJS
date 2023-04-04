import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o e-mail.' })
  @IsEmail({}, { message: 'O e-mail informado é invalido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário informar o password' })
  @MinLength(8, { message: 'Password deve ser maior ou igual a 8 caracteres' })
  password: string;
}
