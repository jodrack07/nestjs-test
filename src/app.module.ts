import { Module, NestModule, MiddlewareConsumer, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { UserModule } from '@app/user/user.module';
import { UserService } from '@app/user/user.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from '@app/guards/auth.guard';
import { LoggingInterceptor } from '@app/interceptors/logging.interceptor';
import { HttpExceptionFilter } from '@app/exceptions/http-exception.exception';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/config/configuration';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
          .apply(LoggerMiddleware)
          .forRoutes('*');
  }
}
