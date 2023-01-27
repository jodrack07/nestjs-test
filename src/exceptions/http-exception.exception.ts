import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common'
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger(HttpExceptionFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {
        this.logger.log(HttpExceptionFilter.name)

        const ctx = host.switchToHttp();
        
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const error = exception.message;

        response.status(status).json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: request.url,
            error,
            data: null
        });
    }
}
