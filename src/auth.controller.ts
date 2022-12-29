// auth.controller.ts

import { Controller, Get, Redirect, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { GitHubService } from './github.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly githubService: GitHubService) { }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() { }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Query('code') code: string) {
    try {
      // Exchange the code for an access token
      console.log(code, "code..")
      const response: AxiosResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: '2ec4fcdd1fdafef735bd',
          client_secret: '9b20660eb9e63db86e5703e7538cdaf0ef9190d4',
          code:code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log(response.data)
      console.log(response)
      const { access_token } = response.data;
      let accessToken = access_token;
      console.log(access_token)
      console.log(accessToken)
      // res.cookie('access_token', access_token, {
      //   httpOnly: true,
      //   sameSite: 'lax',
      //   // secure: this.configService.get<boolean>('IS_PRODUCTION'),
      // });
      console.log("hello wrld")
      // Create a repository on behalf of the authenticated user
      try {
        // Create a repository on behalf of the authenticated user
        const repository = await this.githubService.createRepo('my-repo', access_token);
        console.log(repository);
      } catch (error) {
        console.error(error);
      }
      // res.redirect('http://localhost:3000/repo');
      // Redirect("http://localhost:3000/repo");

      // Save the access token to a cookie or session
      // Redirect to the protected area of the app
    } catch (error) {
      // throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('repo')
  createrepo() {
    console.log("in the repo button")
  }
  @Get('logout')
  logout(req, res) {
    // Clear the user's information from the cookie or session
    // Redirect to the login page
  }
}
