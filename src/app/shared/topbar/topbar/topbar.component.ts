import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from '@firebase/auth-types'

@Component({
  selector: 'qto-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  constructor(private auth: AngularFireAuth) {}
  @Input() user: User

  public logout() {
    this.auth.auth.signOut()
  }
}
