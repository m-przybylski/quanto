import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'qto-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  public items: MenuItem[]
  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'products',
        icon: 'fa fa-book',
        routerLink: ['/products'],
        routerLinkActiveOptions: {},
      },
      {
        label: 'quote',
        icon: 'fa fa-book',
        routerLink: ['/quote'],
        routerLinkActiveOptions: 'active',
      },
    ]
  }
}
