import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  public bool = false;
  constructor (
    public cartService : CartService,
    private router : Router,
    public config : ConfigService
  ) { }

  ngOnInit(): void {
    if(!this.cartService.products.length){
      this.router.navigate(['products']);
    }
  }

  public downloadPDF(){
    this.bool = true;
    setTimeout(() => {
      window.print();
      this.router.navigate(['/products']);
    }, 10);
  }

}
