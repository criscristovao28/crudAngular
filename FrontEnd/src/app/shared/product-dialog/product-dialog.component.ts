import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Product from 'src/app/models/Product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  isUpdating!: boolean;
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) { }

  ngOnInit(): void {
    if (this.data.id != '')
      this.isUpdating = true;
    else
      this.isUpdating = false;

  }

  onCancel() {
    this.dialogRef.close();
  }

}
