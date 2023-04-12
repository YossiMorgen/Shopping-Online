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

  constructor (private config : ConfigService, public productsService: ProductsService) { }

  ngOnInit(): void {
    try {
      this.productsService.getCategories()
    } catch (error : any) {
      alert(error.message);
    }  
  }

  public async getProductByCategory(categoryID : number): Promise<void>{
    try {
      await this.productsService.getAllProductsByCategory( categoryID )
    } catch (error : any) {
      alert(error.message);
    }
  }
}
