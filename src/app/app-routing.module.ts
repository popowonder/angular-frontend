import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'orders/delete/:id', component: OrderComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
