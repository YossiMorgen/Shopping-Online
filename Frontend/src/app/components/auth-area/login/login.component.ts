import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/auth-models/credential.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public constructor( 
        private auth: AuthService, 
        private router: Router,
        private formBuilder : FormBuilder,
        private toast: ToastifyNotificationsService
    ){}
    public loginForm = this.formBuilder.group({
        email : ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required]],
        password : ['', [Validators.required, Validators.minLength(5)]]
    })

    public async login():Promise<void>{        

        try {
            await this.auth.login( new CredentialsModel(this.loginForm.value) );
            this.toast.success('Welcome back')
            this.router.navigateByUrl('/products');
        } catch (error:any) {
            this.toast.error(error);
        }
    }

}
