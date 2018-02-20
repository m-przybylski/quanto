import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'qto-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
