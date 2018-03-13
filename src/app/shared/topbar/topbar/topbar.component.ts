import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { UserInfo } from 'firebase'

@Component({
  selector: 'qto-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  items = [
    {
      label: 'user settings',
      icon: 'fa-user',
      routerLink: ['/user'],
    },
    {
      label: 'company settings',
      icon: 'fa-building',
      routerLink: ['/company'],
    },
    {
      label: 'logout',
      icon: 'fa-sign-out',
      command: () => {
        this.logout()
      },
      routerLink: ['/login'],
    },
  ]
  constructor(private auth: AngularFireAuth) {}
  @Input() user: UserInfo

  private logout() {
    this.auth.auth.signOut()
  }
}
