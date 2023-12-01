import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-product-offer',
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
  templateUrl: './edit-product-offer.component.html',
  styleUrl: './edit-product-offer.component.scss',
})
export class EditProductOfferComponent implements OnInit {
  idProductOffer: number | null = null;

  form: FormGroup = this.formBuilder.group({
    price: [0, [Validators.required, Validators.min(0.01)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idProductOffer = params['id'];

      this.http
        .get('http://localhost:8080/product-offer/' + this.idProductOffer)
        .subscribe((product) => {
          //hydrate le formulaire avec le produit (matching entre propriété de l'objet et nom des formControl)
          this.form.patchValue(product);
        });
    });
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.http
        .post('http://localhost:8080/product-offer', this.form.value)
        .subscribe((result) => this.router.navigateByUrl('/product-offers'));
    }
  }
}
