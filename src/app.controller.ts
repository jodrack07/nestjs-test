import { Body, Controller, Get, Post, Logger, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { FreezePipe } from '@app/pipes/freeze.pipe';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class AppController {
  private readonly logger = new Logger(AppController.name)
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUser(): number {
    this.logger.log('getUser userId', this.userService.getUser())
    return this.userService.getUser();
  }

  @Post()
  examplePost(@Body(new FreezePipe()) body: any) {
    console.log(this.configService.get<string>('DATABASE_USER'));
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException()
  }
}
