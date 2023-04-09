import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/auth-models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent { 

    public constructor( private auth: AuthService, private router: Router ){}

    public user = new User();

    public async register():Promise<void>{
        try {
            await this.auth.register( this.user );
            alert('Welcome!');    
            this.router.navigateByUrl('/products');
        } catch (error:any) {
            alert( error.message )
        }
    }

}
