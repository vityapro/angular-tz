import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { StoreCardComponent } from "../../ui/store-card/store-card.component";
import { StoreFormComponent } from "../store-form/store-form.component";
import { Store, StoreService } from "../../data-access";
import { AlertTimeoutComponent } from "../../../shared/feature/alert-timeout/alert-timeout.component";

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ CommonModule, StoreCardComponent, StoreFormComponent, AlertTimeoutComponent ],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {

  public storeService = inject(StoreService)

  trackByFn(index: number, item: Store) {
    return item.id;
  }
}
