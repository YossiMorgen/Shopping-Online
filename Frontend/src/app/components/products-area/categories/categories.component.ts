import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import CategoryModel from 'src/app/models/product-models/category.model';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  public categories : CategoryModel[] = [];

  constructor (
    private config : ConfigService, 
    public productsService: ProductsService,
    private route: ActivatedRoute
  ) { }
  public paramsProductID: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any): true | void => {
      this.paramsProductID = params['category_id'];
    })
    try {
      this.productsService.getCategories()
    } catch (error : any) {
      alert(error.message);
    }  
    console.log(this.isActive(2));
    
  }

  public async getProductByCategory(categoryID : number): Promise<void>{
    try {
      await this.productsService.getAllProductsByCategory( categoryID )
    } catch (error : any) {
      alert(error.message);
    }
  }

  public isActive(categoryID : number): boolean {
    let boolean = false;
    if(this.paramsProductID == '' + categoryID) {      
      boolean = true;
    }
    return boolean;
  }
}
