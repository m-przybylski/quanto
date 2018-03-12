import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { UserInfo } from 'firebase'

@Component({
  selector: 'qto-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {
    const user: UserInfo = this.auth.auth.currentUser
    user.displayName = 'asd'

    // settings: {
    //   company : [{}],
    //   currency: [],
    //   user: UserInfo: {},
    // }
  }

  ngOnInit() {}
}
