import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MenuModule } from 'primeng/menu'
import { SidebarModule } from './sidebar/sidebar.module'
import { ListModule } from './list/list.module'

@NgModule({
  imports: [CommonModule, MenuModule, SidebarModule, ListModule],
  declarations: [],
})
export class SharedModule {}
