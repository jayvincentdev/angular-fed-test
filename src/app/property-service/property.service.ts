import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../types';

@Injectable({  
    providedIn: 'root'
 })
 export class PropertyService {
  constructor(
    private http: HttpClient
  ) {}

  public getProperties() {
    return this.http.get<Property[]>('/api/properties');
  }
}
