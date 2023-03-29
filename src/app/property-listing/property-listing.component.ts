import { AfterViewInit, Component, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Property } from '../../types';

import { PropertyService } from '../property-service/property.service';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements AfterViewInit {
  properties$!: Observable<Property[] | null>;
  error: string | null = null;
  loading = true;

  constructor(
    private propertyService: PropertyService
  ) {}

  ngAfterViewInit() {
    this.properties$ = this.propertyService
      .getProperties()
      .pipe(
        catchError(() => {
          this.error = 'Sorry, there has been an error.';
          return of(null);
        }),
        tap((properties) => {
          this.loading = false;
          if (properties) this.error = null;
        })
      );
  }
}
