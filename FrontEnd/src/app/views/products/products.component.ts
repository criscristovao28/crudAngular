import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import Product from 'src/app/models/Product';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from 'src/app/shared/product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService, LoginService]
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>

  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'category', 'actions']

  constructor(
    private dialog: MatDialog,
    private productService: ProductsService,
    private loginService: LoginService,
    private router: Router
  ) {

    if(!loginService.ifLogeddIn())
    this.router.navigate(['login'])
    this.get();
  }

  ngOnInit(): void {
  }

  openDialog(product: Product | null) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '250px',
      data: product != null ?
        product : {
          id: '',
          name: '',
          price: '',
          category: 0
        }
    });

    dialogRef.afterClosed().subscribe(product => {
      if (product != undefined) {
        if (this.products.map(p => p.id).includes(product.id))
        {
          this.productService.update(product)
          .subscribe(data => {
            const index = this.products.findIndex(p => p.id == data.id);
            this.products[index] = product;
            this.table.renderRows();
          });
        }       
        else {
          this.productService.create(product)
            .subscribe(data => {
              this.products.push(data)
              this.table.renderRows();
            });
        }
      }
    });
  }

  get() {
    this.productService.Get()
    .subscribe(data=> {
      console.log(data);
      this.products=data});
  }


  Create(product: Product) {
    this.openDialog(product);
  }

  update(product: Product) {
    this.openDialog(product);
  }

  delete(id: string) {
    this.productService.delete(id)
      .subscribe(() => {
        this.products = this.products.filter(p => p.id != id);
      });
  }
}
