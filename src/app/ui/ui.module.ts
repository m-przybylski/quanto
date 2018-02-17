import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HomeComponent } from './home/home.component'
import { SidebarModule } from '../shared/sidebar/sidebar.module'
import { TopbarModule } from '../shared/topbar/topbar.module'
import { RouterModule } from '@angular/router'
import { GrowlModule } from 'primeng/growl'
import { MessageService } from 'primeng/components/common/messageservice'
import { CoreModule } from '../core/core.module'

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    TopbarModule,
    RouterModule,
    GrowlModule,
    CoreModule,
  ],
  declarations: [HomeComponent],
  providers: [MessageService],
})
export class UiModule {}
