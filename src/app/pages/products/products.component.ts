import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPricePipe } from '../../pipes/product-price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductPricePipe,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  now: Date = new Date();
  isAdmin: boolean = false;

  productList: Product[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.auth._user.subscribe(
      (user) => (this.isAdmin = user ? user?.isAdmin : false)
    );

    this.http
      .get<any>('http://localhost:8080/products')
      .subscribe((productList) => {
        this.productList = productList;
        console.log(this.productList);
      });
  }

  onClickDeleteProduct(idProduct: number): void {
    this.http
      .delete<Product>('http://localhost:8080/admin/product/' + idProduct)
      .subscribe({
        next: (product) => {
          alert('produit supprimé');
          console.log(product);
        },
        error: (error) => {
          alert('erreur');
          console.log(error);
        },
      });
  }
}
