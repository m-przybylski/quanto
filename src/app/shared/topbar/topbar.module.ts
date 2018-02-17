import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MenuModule } from 'primeng/menu'
import { TopbarComponent } from './topbar.component'

@NgModule({
  imports: [CommonModule, MenuModule],
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
})
export class TopbarModule {}
