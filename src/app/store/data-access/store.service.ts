import { computed, inject, Injectable, signal } from '@angular/core';
import { AddStoreItem, EditStoreItem, Product, RemoveStoreItem, Store } from "./store.types";
import { ApiService, EventService } from "../../shared/data-access";
import { combineLatest, map, Subject } from "rxjs";
import { sortStore } from "../util/store.util";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ALERT_MESSAGE_EVENT } from "../../shared/data-access/event.types";

export interface StoreItemsState {
  storeItems: Store[];
  productItems: Product[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private api = inject(ApiService);
  private eventService = inject(EventService);

  private state = signal<StoreItemsState>({
    loaded: false,
    storeItems: [],
    productItems: [],
  });

  loaded = computed(() => this.state().loaded);
  storeItems = computed(() => this.state().storeItems.sort((a, b)=> sortStore(a, b)));
  productItems = computed(() => this.state().productItems);

  private storeItemsLoaded$ = this.loadStoreItems();

  add$ = new Subject<AddStoreItem>();
  remove$ = new Subject<RemoveStoreItem>();
  edit$ = new Subject<EditStoreItem>();

  constructor() {
    this.storeItemsLoaded$
      .pipe(takeUntilDestroyed())
      .subscribe(([storeItems, productItems]) =>
        this.state.update((state) => ({
          ...state,
          storeItems,
          productItems,
          loaded: true,
        }))
      );

    this.add$.pipe(takeUntilDestroyed())
      .subscribe((addStore) => {
        this.state.update((state) => ({
          ...state,
          storeItems: [
            ...state.storeItems,
            {
              ...addStore.item,
              id: Date.now(),
            },
          ],
        }));

        this.eventService.publish(ALERT_MESSAGE_EVENT, {
          type: 'success',
          msg: `New store: "${addStore.item.name}" added successfully!`,
          timeout: 2000
        });
      });

    this.remove$.pipe(takeUntilDestroyed())
      .subscribe((id) => {
        this.state.update((state) => ({
          ...state,
          storeItems: state.storeItems.filter((item) => item.id !== id),
        }));

        this.eventService.publish(ALERT_MESSAGE_EVENT, {
          type: 'success',
          msg: `Store removed successfully!`,
          timeout: 2000
        });
      });

    this.edit$.pipe(takeUntilDestroyed())
      .subscribe((update) =>
        this.state.update((state) => ({
          ...state,
          storeItems: state.storeItems.map((item) => item.id === update.id ? { ...item, ...update.data } : item),
        })));
  }

  loadStoreItems(){
    return combineLatest([this.loadStores(), this.loadProducts()]);
  }

  loadStores(){
    return this.api.get<Store[]>('stores');
  }

  loadProducts(){
    return this.api.get<Product[]>('products');
  }

  getProduct(id: Product['id']): Product | undefined{
    return this.productItems().find((p) => (p.id == id));
  }
}
