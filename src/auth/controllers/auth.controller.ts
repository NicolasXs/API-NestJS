import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { ILogin } from '../interfaces/ILogin';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() dto: UserLoginDto): Promise<ILogin> {
    return this.authService.validateUser(dto);
  }
}
