import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { ApiTags, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ILogin } from '../interfaces/ILogin';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Credenciais inválidas.' })
  public async login(@Body() loginDto: UserLoginDto): Promise<ILogin> {
    const login = await this.authService.validateUser(loginDto);
    return login;
  }
}
