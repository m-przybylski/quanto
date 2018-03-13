import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserRoutingModule } from './user-routing.module'
import { UserInfoComponent } from './user-info/user-info.component'
import { DynamicFormModule } from '../../shared/dynamic-form/dynamic-form.module'

@NgModule({
  imports: [CommonModule, UserRoutingModule, DynamicFormModule],
  declarations: [UserInfoComponent],
})
export class UserModule {}
