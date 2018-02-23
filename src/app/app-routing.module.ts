import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './ui/home/home.component'
import { LoginGuardService } from './core/guards/login-guard.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuardService],
    children: [
      {
        path: 'products',
        loadChildren: 'app/ui/product/product.module#ProductModule',
      },
      {
        path: 'quote',
        loadChildren: 'app/ui/quote/quote.module#QuoteModule',
      },
    ],
  },
  {
    path: 'login',
    loadChildren: 'app/ui/login/login.module#LoginModule',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
