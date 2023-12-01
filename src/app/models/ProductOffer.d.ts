interface ProductOffer {
  id: number;
  price: number;
  percentageDiscount: boolean;
  seller: Seller;
  product: Product;
  discount: number;
  discountCode?: string;
  disable?: boolean;
}
