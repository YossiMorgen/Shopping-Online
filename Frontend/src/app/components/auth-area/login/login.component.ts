import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/auth-models/credential.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public constructor( private auth: AuthService, private router: Router ){}

    public credentials = new CredentialsModel();

    public async login():Promise<void>{
        try {
            await this.auth.login( this.credentials );
            alert('Welcome back!');
            this.router.navigateByUrl('/products');
        } catch (error:any) {
            alert( error.message )
        }
    }

}
