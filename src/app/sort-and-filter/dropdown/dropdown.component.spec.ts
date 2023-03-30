import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import { By } from "@angular/platform-browser";

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  const changeFunction = jasmine.createSpy().and.returnValue(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.label = 'Price';
    component.options = [
      '100000', '200000', '300000', '400000', '500000', '600000', '700000', '800000', '900000', '1000000', '1100000', '1200000', '1300000', '1400000', '1500000',
    ];
    component.onChange.emit = changeFunction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toContain('Price');
  });

  it('should render options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const options = compiled.querySelectorAll('option');
    expect(options[0].textContent).toBe('');
    expect(options[1].textContent).toContain('100000');
    expect(options[2].textContent).toContain('200000');
    expect(options[6].textContent).toContain('600000');
    expect(options[15].textContent).toContain('1500000');
  });

  it('should click a value in the select', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[3].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges()
    expect(component.onChange.emit).toHaveBeenCalled();
    expect(select.value).toBe('300000');
  });
});
