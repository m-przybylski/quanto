import { Component } from '@angular/core'
import {
  Router,
  GuardsCheckEnd,
  NavigationStart,
  NavigationEnd,
} from '@angular/router'

@Component({
  selector: 'qto-root',
  template: `
  <p-progressBar mode="indeterminate" *ngIf='loading'></p-progressBar>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  public loading: boolean
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true
      }
      if (event instanceof GuardsCheckEnd) {
        if (!event.shouldActivate) {
          router.navigate(['/login'])
        }
      }
      if (event instanceof NavigationEnd) {
        this.loading = false
      }
    })
  }
}
