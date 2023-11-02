import { Store } from "../data-access";

export function sortStore(storeA: Store, storeB: Store){
  const totalProductsA: number = !storeA.products ? 0 : storeA.products
    .reduce((a, b)=> {
      return a + b.amount;
  }, 0);

  const totalProductsB: number = !storeB.products ? 0 : storeB.products
    .reduce((a, b)=> {
      return a + b.amount;
    }, 0);

  return totalProductsB - totalProductsA;
}
