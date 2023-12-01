interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  productOfferList?: ProductOffer[];
  thumbnail: string;
  disable?: boolean;
}
