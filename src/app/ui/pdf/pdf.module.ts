import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PlaygroundComponent } from './playground/playground.component'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlaygroundComponent }]),
  ],
  declarations: [PlaygroundComponent],
  exports: [RouterModule],
})
export class PdfModule {}
