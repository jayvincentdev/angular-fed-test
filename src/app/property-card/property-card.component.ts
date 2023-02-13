import { Component, Input } from '@angular/core';
import { Property } from "../../types";

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {

  @Input() property?: Property;
}
