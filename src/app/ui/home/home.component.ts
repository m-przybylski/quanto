import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from '@firebase/auth-types'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'qto-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  user: Observable<User>
  constructor(route: ActivatedRoute) {
    this.user = route.snapshot.data.user
  }
}
