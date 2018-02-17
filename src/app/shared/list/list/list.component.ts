import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'qto-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  constructor() {}
  @Input() items: any[]
}
