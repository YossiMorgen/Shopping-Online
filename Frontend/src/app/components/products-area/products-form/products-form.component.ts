import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import WeightModel from 'src/app/models/product-models/weight.model';
import { ProductsService } from 'src/app/services/products.service';
import { ToastifyNotificationsService } from 'src/app/services/toastify-notifications.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  public productID: number;
  public imageName: string;
  public editMode = false;
  public editedItemIndex: number;

  public subscription : Subscription;
  public weightTypes = Object.values(WeightModel);
  public productsForm = this.formBuilder.group({
    productName : ['', [Validators.required, Validators.minLength(2)]],
    categoryID : [0, [Validators.required]],
    price : [1, [Validators.required, Validators.min(1)]],
    description : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    weight : [0, [ Validators.min(0), Validators.required]],
    weightType: ['kg', [Validators.required]],
    unitsInStock: [0, [Validators.required, Validators.minLength(1)]]
  })

  public file: File;

  constructor ( 
    public productsService: ProductsService, 
    private formBuilder : FormBuilder,
    private toast: ToastifyNotificationsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.productsService.startedEditing.subscribe((index : number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      delete this.file;

      this.productID = this.productsService.products[this.editedItemIndex].productID;
      this.imageName = this.productsService.products[this.editedItemIndex].imageName;
      

      this.productsForm.setValue({
        productName: this.productsService.products[this.editedItemIndex].productName,
        categoryID: this.productsService.products[this.editedItemIndex].categoryID,
        price: this.productsService.products[this.editedItemIndex].price,
        description: this.productsService.products[this.editedItemIndex].description,
        weight: this.productsService.products[this.editedItemIndex].weight,
        weightType: this.productsService.products[this.editedItemIndex].weightType,
        unitsInStock: this.productsService.products[this.editedItemIndex].unitsInStock,
      })

    })
    // option to switch to add mode if product no longer exists on the list
    // this.route.queryParams.subscribe(async () => {
    //   setTimeout(() => {
    //     const i = this.productsService.products.findIndex(i => i.productID === this.productID)
    //     if(i === -1){
    //       this.addMode();
    //       return;
    //     }
    //     this.editedItemIndex = i;
    //   },100)
    // })
  }

  addMode() {
    this.productsForm.reset();
    this.editMode = false;
    delete this.file;
  }


  public onFileSelected(event: any){
    this.file = event.target.files[0];
  }

  public async submitProduct(){
    console.log("submitProduct");
    
    try {      
      const formData = new FormData();

      formData.append('productName', this.productsForm.value.productName)
      formData.append('categoryID', this.productsForm.value.categoryID.toString())
      formData.append('price', this.productsForm.value.price.toString())
      formData.append('description', this.productsForm.value.description)
      formData.append('weight', this.productsForm.value.weight?.toString())
      formData.append('weightType', this.productsForm.value.weightType)
      formData.append('unitsInStock', this.productsForm.value.unitsInStock?.toString())

      if(this.file){
        formData.append('image', this.file);
      }

      if(this.editMode){        
        formData.append('imageName', this.imageName)
        formData.append('productID', this.productID.toString());
        await this.productsService.updateProduct(formData, this.editedItemIndex);
        this.toast.success('Product Edited Successfully')
        this.editMode = false;
        this.productsForm.reset();
        return;
      }

      await this.productsService.addProduct(formData);
      this.toast.success('Product Added Successfully');
      this.productsForm.reset();
      delete this.file;
    } catch (error : any) {
      this.toast.error(error);
    }
  }

}
