import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPrice',
  standalone: true,
})
export class ProductPricePipe implements PipeTransform {
  transform(product: ProductOffer): number {

    if (product.discountCode) {
      
      if (product.percentageDiscount) {
        return product.price - (product.price * product.discount) / 100;
      }
      return product.price - product.discount;
    }

    return product.price;
  }
}
