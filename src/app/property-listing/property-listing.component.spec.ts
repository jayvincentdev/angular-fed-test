import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockComponents, MockService } from 'ng-mocks';
import { of, Subject, throwError } from "rxjs";

import { PropertyListingComponent } from './property-listing.component';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { PropertyService } from '../property-service/property.service';
import { Property } from '../../types';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AlertComponent } from '../alert/alert.component';

const TEST_PROPERTIES = Array(5).fill({
  id: 73864112,
  bedrooms: 3,
  summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
  displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
  propertyType: 'Flat',
  price: 1950000,
  branchName: 'M2 Property, London',
  propertyUrl: '/property-for-sale/property-73864112.html',
  contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
  propertyTitle: '3 bedroom flat for sale',
  mainImage:
    'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg',
});

describe('PropertyListingComponent', () => {
  let component: PropertyListingComponent;
  let fixture: ComponentFixture<PropertyListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PropertyListingComponent,
        MockComponents(
          PropertyCardComponent,
          SpinnerComponent,
          AlertComponent
        )
      ],
      providers: [
        {
          provide: PropertyService,
          useValue: MockService(PropertyService, {
            getProperties: () => of()
          })
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyListingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render 5 property cards', () => {
    const subject = new Subject<Property[]>();
    const propertyService = TestBed.inject(PropertyService);
    spyOn(propertyService, 'getProperties').and.returnValue(subject.asObservable());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('spinner')).toBeTruthy();

    subject.next(TEST_PROPERTIES);
    subject.complete();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-property-card')).toHaveSize(5);
  });

  it('should show an error if getProperties() throws an error', fakeAsync(() => {
    const propertyService = TestBed.inject(PropertyService);
    spyOn(propertyService, 'getProperties').and.returnValue(throwError(() => new Error()));
    fixture.detectChanges(); // Calls onInit, afterViewInit.
    tick(); // Observable emits.
    fixture.detectChanges(); // Update template.
    expect(fixture.nativeElement.querySelector('alert')).toBeTruthy();
  }));
});
