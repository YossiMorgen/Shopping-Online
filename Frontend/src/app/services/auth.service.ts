import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverUrl: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.serverUrl = configService.baseUrl;

  }
}
