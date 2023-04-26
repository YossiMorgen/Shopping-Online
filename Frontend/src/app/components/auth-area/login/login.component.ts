import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/auth-models/credential.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public constructor( 
        private auth: AuthService, 
        private router: Router,
        private formBuilder : FormBuilder
    ){}
    public loginForm = this.formBuilder.group({
        email : ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        password : ['', [Validators.required, Validators.minLength(5)]]
    })

    public async login():Promise<void>{        

        try {
            await this.auth.login( new CredentialsModel(this.loginForm.value) );
            alert('Welcome back!');
            this.router.navigateByUrl('/products');
        } catch (error:any) {
            alert( error.message )
        }
    }

}
