import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MenuModule } from 'primeng/menu'
import { SidebarModule } from './sidebar/sidebar.module'
import { ListModule } from './list/list.module';
import { HeaderModule } from './header/header.module'

@NgModule({
  imports: [CommonModule, MenuModule, SidebarModule, ListModule, HeaderModule],
  declarations: [],
})
export class SharedModule {}
