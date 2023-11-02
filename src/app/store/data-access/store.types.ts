
export type Store = {
  id: number;
  name: string;
  products?: {
    id: Product['id']
    amount: number
  }[]
}

export type Product = {
  id: number;
  name: string;
}

export type AddStoreItem = { item: Omit<Store, 'id'>; };
export type EditStoreItem = { id: Store["id"]; data: AddStoreItem["item"] };
export type RemoveStoreItem = Store["id"];
