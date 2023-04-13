import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import jwtDecode  from 'jwt-decode';
import User from '../models/auth-models/user.model';
import { CredentialsModel } from '../models/auth-models/credential.model';
import { ConfigService } from '../utils/config.service';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class AuthService{

    public user: User;
    private token: string;

    constructor( private http: HttpClient, private config: ConfigService ){ 
      const token = window.localStorage.getItem('token')
      if( token ) this.setUser(token)
    }

    public async register( user: User ): Promise<void> {
        const observable = this.http.post<string>( this.config.register, user );
        const token = await firstValueFrom(observable);
        this.setUser(token)
    }

    public async login( credentials: CredentialsModel): Promise<void> {
        const observable = this.http.post<string>( this.config.login, credentials );
        const token = await firstValueFrom(observable);
        this.setUser(token)
    }

    public logout():void{
        this.token = '';
        window.localStorage.removeItem('token')
    }

    private setUser(token: string):void{
        this.token = token;
        window.localStorage.setItem('token', token );
        const decode: any = jwtDecode( token )
        this.user = decode.user;
    }

    public isLoggedIn():boolean{
        return this.token && this.token != ''
    }

    public isAdmin():boolean{
        return this.user?.role === 'admin';
    }

    public getToken():string{
        return this.token;
    }


}
