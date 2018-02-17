import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'qto-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit {
  public items: MenuItem[]
  constructor() {}

  ngOnInit() {
    this.items = [
      { label: 'products', icon: 'book', routerLink: ['/products'] },
      { label: 'quote', icon: 'book', routerLink: ['/quote'] },
    ]
  }
}
