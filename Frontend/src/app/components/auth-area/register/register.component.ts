import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import User from 'src/app/models/auth-models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent { 

    public constructor( 
        private auth: AuthService, private router: Router,
        private _formBuilder: FormBuilder
    ){}
    public complete = false;
    public user = new User();

    public firstFormGroup = this._formBuilder.group({
        email: [null, Validators.required],
        // password: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        // conformPassword: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    })
    public secondFormGroup = this._formBuilder.group({
        firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        // lastName: [null, Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        // city: [null, Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        // street: [null, Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    })

    public isTenAsync(control: AbstractControl): 
    Observable<ValidationErrors | null> {
        const v: number = control.value;
        if (v !== 10) {
        // Emit an object with a validation error.
        return of({ 'notTen': true, 'requiredValue': 10 });
        }
        // Emit null, to indicate no error occurred.
        return of(null);
    }

    public async completeStep(){
        if(this.user.confirmPassword !== this.user.password){
            alert('The Passwords do not match');
            return;
        }
        try {
            if(await this.auth.isEmailExist(this.user.email)){
                alert('Email already exists');
                return;
            }
            this.complete = true;      

        } catch (error: any){
            alert(error.message);
        }
    }

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
