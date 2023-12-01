import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  idProduct: number | null = null;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idProduct = params['id'];

      this.http
        .get('http://localhost:8080/product/' + this.idProduct)
        .subscribe((product) => {
          //hydrate le formulaire avec le produit (matching entre propriété de l'objet et nom des formControl)
          this.form.patchValue(product);
        });
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.http
        .post('http://localhost:8080/product', this.form.value)
        .subscribe((result) => this.router.navigateByUrl('/products'));
    }
  }
}
