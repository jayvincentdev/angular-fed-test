import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label?: string;
  @Input() options: string[] = [];
  @Output() onChange = new EventEmitter<string>();

  handleChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    if (this.onChange) {
      this.onChange.emit(value);
    }
  }
}
