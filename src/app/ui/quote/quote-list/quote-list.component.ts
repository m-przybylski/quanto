import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'qto-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
