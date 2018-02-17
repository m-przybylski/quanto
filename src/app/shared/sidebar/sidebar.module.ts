import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SidebarComponent } from './sidebar.component'
import { MenuModule } from 'primeng/menu'

@NgModule({
  imports: [CommonModule, MenuModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
