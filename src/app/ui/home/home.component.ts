import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'qto-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private items: MenuItem[]

  constructor() {}

  ngOnInit() {
    this.items = [{ label: 'home' }, { label: 'products' }, { label: 'quote' }]
  }
}
