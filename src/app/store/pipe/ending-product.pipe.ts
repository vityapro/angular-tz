import { inject, Pipe, PipeTransform } from '@angular/core';
import { Store, StoreService } from "../data-access";

@Pipe({
  name: 'endingProduct',
  standalone: true
})
export class EndingProductPipe implements PipeTransform {

  private storeService = inject(StoreService);

  transform(value: Store | null, ...args: unknown[]): string {
    if (value?.products) {
      const endingProduct = value?.products
        .sort((p1, p2) => (p1.amount - p2.amount))
        .shift();
      if (endingProduct) {
        const product = this.storeService.getProduct(endingProduct.id);
        return `${product?.name} - In Stock ${endingProduct.amount} items`;
      }
    }
    return 'No products in the store';
  }
}
