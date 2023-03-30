import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
  selectedOptions: Record<string, boolean> = {};
  @Input() label!: string;
  @Input() options: string[] = [];
  @Output() onChange = new EventEmitter<string[]>();

  handleChange(e: Event) {
    const target = (e.target as HTMLInputElement);
    this.selectedOptions = {...this.selectedOptions, [target.value]: target.checked};
    if (this.onChange) {
      const values = Object.keys(this.selectedOptions).filter((key) => Boolean(this.selectedOptions[key]))
      this.onChange.emit(values);
    }
  }
}
