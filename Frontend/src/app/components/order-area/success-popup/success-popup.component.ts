import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {
  public bool = false;
  constructor (
    private router : Router,
    public dialogRef: MatDialogRef<SuccessPopupComponent>,

  ) { }
 
  onNoClick(): void {    
    this.dialogRef.close();
  }

}
