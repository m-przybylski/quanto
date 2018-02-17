import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HomeComponent } from './home/home.component'
import { SidebarModule } from '../shared/sidebar/sidebar.module'
import { TopbarModule } from '../shared/topbar/topbar.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [CommonModule, SidebarModule, TopbarModule, RouterModule],
  declarations: [HomeComponent],
})
export class UiModule {}
