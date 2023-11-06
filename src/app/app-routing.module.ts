import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrencyTableComponent } from './currency-table/currency-table.component';


const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'currency-table', component: CurrencyTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
