import { UserService } from '@app/user/user.service';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) {}

    private logger = new Logger(LoggingInterceptor.name)
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ):  Observable<any> | Promise<Observable<any>>{
        this.logger.log(LoggingInterceptor.name)
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || ''
        const { ip, method, path: url } = request

        // logging when hitting the request handler
        this.logger.log(
            ` ${method} ${url} ${userAgent} ${ip} : ${context.getClass().name} ${context.getHandler().name} invoked...`
        )

        // getting the user that is calling the API
        this.logger.debug('userId', this.userService.getUser())

        const startingTime = Date.now();

        // logging after hitting the request handler
        return next.handle().pipe(
            // tap is a sideEffect func that helps to have access to the request response
            tap((res) => {
                const response = context.switchToHttp().getResponse();
                const { statusCode } = response

                this.logger.log(`
                    ${method} ${statusCode} ${url} ${userAgent} ${ip} : ${Date.now() - startingTime}ms
                `);

                // let's get also the response that get returned
                this.logger.debug(`
                    Response : ${res}
                `);
            })
        );
    }
}
