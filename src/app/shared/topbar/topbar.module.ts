import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MenuModule } from 'primeng/menu'
import { TopbarComponent } from './topbar/topbar.component'
import { ContextMenuModule } from '../context-menu/context-menu.module'

@NgModule({
  imports: [CommonModule, MenuModule, ContextMenuModule],
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
})
export class TopbarModule {}
