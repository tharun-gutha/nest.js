import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { GitHubService } from './github.service'

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, GithubStrategy, GitHubService],
})
export class AppModule { }
