import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Property } from '../../types';

import { PropertyService } from '../property-service/property.service';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.scss']
})
export class PropertyListingComponent implements AfterViewInit, OnDestroy {
  properties$!: Observable<Property[] | null>;
  error: string | null = null;
  loading = true;

  private destroy$ = new Subject<void>();

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
        }),
        takeUntil(this.destroy$)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
