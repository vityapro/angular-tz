import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product, Store, StoreService } from "../../data-access";
import { BsModalRef, BsModalService, ModalModule } from "ngx-bootstrap/modal";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { map, startWith } from "rxjs";
import { NgSelectModule } from '@ng-select/ng-select';
import { OnlyNumbersDirective } from "../../../shared/directives";

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, ModalModule, FormsModule, NgSelectModule, OnlyNumbersDirective ],
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css'],
})
export class StoreFormComponent {

  private storeService = inject(StoreService);

  fb = inject(FormBuilder);
  modalService = inject(BsModalService);
  modalRef?: BsModalRef;
  storeForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    products: this.fb.array<FormGroup>([])
  });

  productControl = this.fb.control<Product | null>(null, Validators.required);
  productAmountControl = this.fb.control<number>(0, Validators.required);

  availableProducts$ = this.products.valueChanges
    .pipe(
      startWith(1),
      takeUntilDestroyed(),
      map(() => {
        const alreadyAddedProducts: Product["id"][] = this.products.controls.map((c) => c.controls['product'].value.id)
        return this.storeService.productItems().filter((p) => !alreadyAddedProducts.includes(p.id))
      }))

  get products() {
    return this.storeForm.controls["products"] as FormArray<FormGroup>;
  }

  addProduct() {
    if (this.productControl.invalid) {
      return;
    }
    const amount = !this.productAmountControl.value ? 0 : +this.productAmountControl.value;
    const productGroup = this.fb.nonNullable.group({
      product: [this.productControl.value],
      amount: [amount],
    });
    this.storeForm.controls.products.push(productGroup);
    this.productControl.reset();
    this.productAmountControl.reset();
  }

  removeProduct(index: number){
    this.storeForm.controls.products.removeAt(index);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addStore() {
    if (this.storeForm.invalid) {
      return;
    }
    const products = this.products.controls
      .map((p) => {
        return { id: p.get('product')?.value.id, amount: p.get('amount')?.value }
      })
    const store: Omit<Store, 'id'> = {
      name: this.storeForm.controls.name.value,
      products: products
    };
    this.storeService.add$.next({item: store});
    this.storeForm.reset();
    this.products.clear();
  }
}
