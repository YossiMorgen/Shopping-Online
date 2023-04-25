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

    public complete = false;
    public user = new User();
    public productsAmount: number;
    public ordersAmount: number;

    public constructor( 
        private auth: AuthService, private router: Router,
        private productsService :ProductsService
    ){}

    async ngOnInit(): Promise<void> {
        try {
            [this.productsAmount, this.ordersAmount] = await this.productsService.getProductsAndOrdersAmount();
        } catch (error : any) {
            alert(error.message);
        }
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
