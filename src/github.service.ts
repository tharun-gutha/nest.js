// github.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import axios from 'axios';

@Injectable()
export class GitHubService {
  constructor() { }

  async createRepo(name: string, accessToken: string): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post(
        `https://api.github.com/user/repos`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
