import { Component } from '@angular/core'
import {
  Router,
  GuardsCheckEnd,
  NavigationStart,
  NavigationEnd,
} from '@angular/router'
import { UserService } from './core/user/user.service'

@Component({
  selector: 'qto-root',
  template: `<div id='root' [ngClass]='className'>
  <p-progressBar mode="indeterminate" *ngIf='loading'></p-progressBar>
  <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent {
  public loading: boolean
  public className: string
  constructor(router: Router, userService: UserService) {
    userService.user().subscribe(userSelectedClass => {
      this.className = userSelectedClass || 'theme-pink-indigo'
    })
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
