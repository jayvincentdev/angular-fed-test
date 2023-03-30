import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PropertyFilters } from 'src/types';
import { bedOptions, propertyTypes, priceOptions } from "../../constants";
import { PropertyService } from '../property-service/property.service';

@Component({
  selector: 'app-sort-and-filter',
  templateUrl: './sort-and-filter.component.html',
  styleUrls: ['./sort-and-filter.component.scss']
})
export class SortAndFilterComponent {
  bedOptions = bedOptions;
  propertyTypeOptions = propertyTypes;
  priceOptions = priceOptions;

  // Reactive form to hold filter state.
  form = this.fb.nonNullable.group({
    minPrice: [''],
    maxPrice: [''],
    minBeds: [''],
    maxBeds: [''],
    propertyTypes: [[] as string[]]
  });

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.form
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => 
        // When form value changes, update filters in service.
        this.propertyService.patchFilters(this.removeEmpty(value))
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onChange(name: string, value: string): void {
    this.form.get(name)?.patchValue(value);
  }

  onChangeMultiselect(values: string[]): void {
    this.form.get('propertyTypes')?.patchValue(values);
  }

  private removeEmpty(filters: Partial<PropertyFilters>): Partial<PropertyFilters> {
    const hasValue = (value: string | string[] | undefined): boolean => {
      if (Array.isArray(value))
        return value.length > 0;
      return !(value === null || value === undefined || value === '');
    }

    // This could definitely be improved!
    const obj: Partial<PropertyFilters> = {};
    if (hasValue(filters.minPrice)) obj.minPrice = filters.minPrice;
    if (hasValue(filters.maxPrice)) obj.maxPrice = filters.maxPrice;
    if (hasValue(filters.minBeds)) obj.minBeds = filters.minBeds;
    if (hasValue(filters.maxBeds)) obj.maxBeds = filters.maxBeds;
    if (hasValue(filters.propertyTypes)) obj.propertyTypes = filters.propertyTypes;
    return obj;
  }
}
