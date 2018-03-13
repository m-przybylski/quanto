import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './ui/home/home.component'
import { LoginGuardService } from './core/guards/login-guard.service'
import { UserResolverService } from './core/resolvers/user-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginGuardService],
    resolve: {
      user: UserResolverService,
    },
    children: [
      {
        path: 'products',
        loadChildren: 'app/ui/product/product.module#ProductModule',
      },
      {
        path: 'quote',
        loadChildren: 'app/ui/quote/quote.module#QuoteModule',
      },
      {
        path: 'user',
        loadChildren: 'app/ui/user/user.module#UserModule',
      },
      {
        path: 'company',
        loadChildren: 'app/ui/company/company.module#CompanyModule',
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
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
