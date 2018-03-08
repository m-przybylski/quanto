import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserRoutingModule } from './user-routing.module'
import { UserInfoComponent } from './user-info/user-info.component'

@NgModule({
  imports: [CommonModule, UserRoutingModule],
  declarations: [UserInfoComponent],
})
export class UserModule {}
