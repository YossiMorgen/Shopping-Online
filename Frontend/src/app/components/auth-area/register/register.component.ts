import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import User from 'src/app/models/auth-models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 

    public emailAndPasswordForm = this.formBuilder.group({
        email : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], this.frobiddenEmail.bind(this)],
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
        public auth: AuthService, private router: Router,
        private productsService :ProductsService,
        private formBuilder : FormBuilder,
        private toast: ToastifyNotificationsService
    ){}

    async ngOnInit(): Promise<void> {
        try {
            [this.productsAmount, this.ordersAmount] = await this.productsService.getProductsAndOrdersAmount();
        } catch (error : any) {
            this.toast.error(error);
        }

        this.emailAndPasswordForm.valueChanges.subscribe(value => console.log(this.emailAndPasswordForm.controls?.['email'].errors) )
    }

    public async completeStep(){

        // try {
        //     if(await this.auth.isEmailExist(this.emailAndPasswordForm.value.email)){
        //         this.toast.error('Email already exists');
        //         return;
        //     }
        //     this.complete = true;      

        // } catch (error: any){
        //     this.toast.error(error);
        // }
        this.complete = true;      

    }

    public async frobiddenEmail(controll: FormControl): Promise<any> {
            console.log(await this.auth.isEmailExist(controll.value));
            
            try {
                if(await this.auth.isEmailExist(controll.value)){
                    this.toast.error("Email already exists")
                    return({'Email already exists': true})
                }else {
                    return(null);
                }
    
            } catch (error: any){
                this.toast.error(error);
            }
    }

    public matchPasswords(control: AbstractControl): ValidatorFn {
        // return new Promise(resolve => {
        //     const forbidden = this.emailAndPasswordForm.value.confirmPassword !== this.emailAndPasswordForm.value.password
        //     resolve(forbidden ? {'noMatch': {value: control.value}} : null)
        // })
        return (control: AbstractControl): ValidationErrors | null => {
            const forbidden = this.emailAndPasswordForm.value.confirmPassword !== this.emailAndPasswordForm.value.password
            return forbidden ? {noMatch: {value: control.value}} : null;
        };
    }

    public async register():Promise<void>{
        try {
            await this.auth.register( new User({...this.emailAndPasswordForm.value, ...this.nameAndAddressForm.value}) );
            this.toast.success('Welcome ' + this.auth.user.firstName + " " + this.auth.user.lastName)
            this.router.navigateByUrl('/products');
        } catch (error:any) {
            this.toast.error(error);
        }
    }

}
