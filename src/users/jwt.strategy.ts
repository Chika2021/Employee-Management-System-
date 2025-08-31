import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "./model/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'ANYACHIKAAMAECHI',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return { id: user.id, email: user.email, role: user.role  };
    }
}
