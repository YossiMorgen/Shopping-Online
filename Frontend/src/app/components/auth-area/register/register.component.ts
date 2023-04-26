import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit { 

    public emailAndPasswordForm = this.formBuilder.group({
        email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        password : ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword : ['', [Validators.required, Validators.minLength(5)]]
    })
    public nameAndAddressForm = this.formBuilder.group({
        firstName : ['', [Validators.required, Validators.minLength(2)]],
        lastName : ['', [Validators.required, Validators.minLength(2)]],
        city : ['', [Validators.required, Validators.minLength(2)]],
        street : ['', [Validators.required, Validators.minLength(2)]],
    })
    public complete = false;
    public productsAmount: number;
    public ordersAmount: number;

    public constructor( 
        private auth: AuthService, private router: Router,
        private productsService :ProductsService,
        private formBuilder : FormBuilder
    ){}

    async ngOnInit(): Promise<void> {
        try {
            [this.productsAmount, this.ordersAmount] = await this.productsService.getProductsAndOrdersAmount();
        } catch (error : any) {
            alert(error.message);
        }
    }

    public async completeStep(){
        if(this.emailAndPasswordForm.value.confirmPassword !== this.emailAndPasswordForm.value.password){
            alert('The Passwords do not match');
            return;
        }
        try {
            if(await this.auth.isEmailExist(this.emailAndPasswordForm.value.email)){
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
            await this.auth.register( new User({...this.emailAndPasswordForm.value, ...this.nameAndAddressForm.value}) );
            alert('Welcome!');    
            this.router.navigateByUrl('/products');
        } catch (error:any) {
            alert( error.message )
        }
    }

}
