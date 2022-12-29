// auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { GitHubService } from './github.service'

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [GithubStrategy, GitHubService],
})
export class AuthModule { }
