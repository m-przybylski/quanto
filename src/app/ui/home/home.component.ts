import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserInfo } from '@firebase/auth-types'

@Component({
  selector: 'qto-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  user: UserInfo
  constructor(route: ActivatedRoute) {
    this.user = route.snapshot.data.user
  }
}
