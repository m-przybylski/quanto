import { Component, ChangeDetectionStrategy } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'qto-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  constructor(private auth: AngularFireAuth) {}

  public logout() {
    this.auth.auth.signOut()
  }
}
