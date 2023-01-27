import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    private userId: number;
    setUser(_userId: number): void {
        this.userId = _userId
    }

    getUser(): number {
        return this.userId;
    }
}
