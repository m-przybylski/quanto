import { Component, Input } from '@angular/core'

@Component({
  selector: 'qto-form-group-header',
  templateUrl: './form-group-header.component.html',
  styleUrls: ['./form-group-header.component.scss'],
})
export class FormGroupHeaderComponent {
  @Input() public headerCaption: string
  constructor() {}
}
