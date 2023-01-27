import { UserService } from "@app/user/user.service";
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name);

    constructor(private readonly userService: UserService) {}
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(LoggerMiddleware.name)

        this.userService.setUser(1234);
        next();
    }
}
