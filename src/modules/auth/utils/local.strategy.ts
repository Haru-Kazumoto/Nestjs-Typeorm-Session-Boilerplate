import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { AuthRequest } from "../../interfaces/auth.request.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private authService: AuthService
    ){
        super({
            usernameField: 'username'
        });
    }

    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}