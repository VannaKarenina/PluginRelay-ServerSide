import {Injectable, UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy} from "passport-jwt";

const {JWT_SECRET} = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      expiresIn: '60s'
    });

  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }


}
