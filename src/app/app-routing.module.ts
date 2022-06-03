import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesTableComponent } from './countries-table/countries-table.component';
import { CountryFormComponent } from './country-form/country-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'form', component: CountryFormComponent },
  { path: 'table', component: CountriesTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
