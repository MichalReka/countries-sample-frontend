import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountryService } from 'src/core/services/country.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesTableComponent } from './countries-table/countries-table.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    CountriesTableComponent,
    CountryFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [CountryService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
