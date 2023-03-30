import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponents, MockService } from 'ng-mocks';
import { PropertyService } from '../property-service/property.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MultiselectComponent } from './multiselect/multiselect.component';

import { SortAndFilterComponent } from './sort-and-filter.component';

describe('SortAndFilterComponent', () => {
  let component: SortAndFilterComponent;
  let fixture: ComponentFixture<SortAndFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SortAndFilterComponent,
        MockComponents(
          DropdownComponent,
          MultiselectComponent
        )
      ],
      providers: [
        {
          provide: PropertyService,
          useValue: MockService(PropertyService)
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortAndFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
