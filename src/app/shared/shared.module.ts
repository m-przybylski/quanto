import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MenuModule } from 'primeng/menu'
import { SidebarModule } from './sidebar/sidebar.module'

@NgModule({
  imports: [CommonModule, MenuModule, SidebarModule],
  declarations: [],
})
export class SharedModule {}
