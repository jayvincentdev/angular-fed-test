import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectComponent } from './multiselect.component';
import { By } from "@angular/platform-browser";

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;
  const changeFunction = jasmine.createSpy().and.returnValue(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    component.label = 'Property Types';
    component.options = [
      'Flat',
      'Semi-Detached',
      'Detached',
      'Terraced',
    ];
    component.onChange.emit = changeFunction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.MultiSelect div')?.textContent).toContain('Property Types');
  });

  it('should render options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    expect(inputs[0].value).toContain('flat');
    expect(inputs[1].value).toContain('semi-detached');
    expect(inputs[2].value).toContain('detached');
    expect(inputs[3].value).toContain('terraced');
  });

  it('should click a value in the multiselect', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[2].nativeElement.checked = true;
    inputs[2].nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges()
    expect(component.onChange.emit).toHaveBeenCalledWith(['detached']);
    expect(component.selectedOptions).toEqual({ detached: true });
  });

  it('should click multiple values in the multiselect', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[2].nativeElement.checked = true;
    inputs[2].nativeElement.dispatchEvent(new Event('change'));
    inputs[0].nativeElement.checked = true;
    inputs[0].nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges()
    expect(component.onChange.emit).toHaveBeenCalledWith(['detached', 'flat']);
    expect(component.selectedOptions).toEqual({ detached: true, flat: true });
  });

  it('should not return values when they are selected and then deselected', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs[2].nativeElement.checked = true;
    inputs[2].nativeElement.dispatchEvent(new Event('change'));
    inputs[0].nativeElement.checked = true;
    inputs[0].nativeElement.dispatchEvent(new Event('change'));
    inputs[2].nativeElement.checked = false;
    inputs[2].nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges()
    expect(component.onChange.emit).toHaveBeenCalledWith(['flat']);
    expect(component.selectedOptions).toEqual({ detached: false, flat: true });
  });
});
