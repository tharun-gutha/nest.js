// github.strategy.ts

import { Strategy } from 'passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './user.interface';
// import { AuthService } from './auth.service';
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: '2ec4fcdd1fdafef735bd',
      clientSecret: '9b20660eb9e63db86e5703e7538cdaf0ef9190d4',
      callbackURL: `http://localhost:3000/auth/github/callback`,
      // state:"tharun123",
      scope: ['user:email', 'repo','public_profile'],
    });
  }

  // github.strategy.ts (continued)

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ): Promise<void> {
    try {
      const user: User = {
        githubId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        avatarUrl: profile._json.avatar_url,
        accessToken,
      };
      return done(null, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

