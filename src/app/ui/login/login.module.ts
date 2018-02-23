import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CoreModule } from '../../core/core.module'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { LoginComponent } from './login.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
