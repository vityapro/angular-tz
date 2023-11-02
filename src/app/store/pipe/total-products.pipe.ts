import { Pipe, PipeTransform } from '@angular/core';
import { Store } from "../data-access";

@Pipe({
  name: 'totalProducts',
  standalone: true
})
export class TotalProductsPipe implements PipeTransform {

  transform(value: Store | null, ...args: unknown[]): number {
    return !value?.products ? 0 : value?.products.reduce((a, b) => a + b.amount, 0);
  }
}
