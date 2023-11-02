import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from "../../data-access";
import { EndingProductPipe, TotalProductsPipe } from "../../pipe";

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: [ './store-card.component.css' ],
  imports: [
    TotalProductsPipe,
    EndingProductPipe
  ],
  standalone: true
})
export class StoreCardComponent {

  @Input({required: true}) store!: Store;

  @Output() remove = new EventEmitter<Store["id"]>();
}
