import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css']
})
export class DownloadPdfComponent implements OnInit {

  constructor(
    public cartService : CartService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      window.print();
      this.router.navigate(['/products']);
    }, 1000);
  }
 
}
