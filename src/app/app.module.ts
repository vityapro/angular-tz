import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { initServicesFactory } from "./init-services.factory";
import { StoreService } from "./store/data-access";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";

const routes: Routes = [
  {
    path: '',
    loadComponent:  () => import('./store/feature/store/store.component').then(m => m.StoreComponent)
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initServicesFactory,
      deps: [StoreService],
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
