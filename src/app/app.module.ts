import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { SortAndFilterComponent } from './sort-and-filter/sort-and-filter.component';
import { DropdownComponent } from './sort-and-filter/dropdown/dropdown.component';
import { MultiselectComponent } from './sort-and-filter/multiselect/multiselect.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListingComponent,
    SortAndFilterComponent,
    DropdownComponent,
    MultiselectComponent,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
