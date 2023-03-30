import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PropertyFilters, Property } from '../../types';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable({  
    providedIn: 'root'
 })
 export class PropertyService {
  readonly endpoint = '/api/properties';
  filters$ = new BehaviorSubject<Partial<PropertyFilters> | null>(null);

  constructor(
    private http: HttpClient
  ) {}

  public getProperties() {
    return this.filters$
      .pipe(
        switchMap((filters) => {
          if (!filters) return this.http.get<Property[]>(this.endpoint);

          let params = new HttpParams().appendAll(filters);
          if (filters.propertyTypes)
            params = params.set('propertyTypes', filters.propertyTypes.join(','));

          return this.http.get<Property[]>(this.endpoint, { params });
        })
      );
  }

  public patchFilters(filters: Partial<PropertyFilters>): void {
    this.filters$.next(filters);
  }
}
