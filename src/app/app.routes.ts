import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './services/guard/auth.guard'
import { NgModule } from '@angular/core';
import {ActivateAccountComponent} from './views/pages/activate-account/activate-account.component';
export const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'books',
        loadChildren: () => import('./views/books/book-routing.module').then((m) => m.routes),
        canActivate: [authGuard]
      },
      {
        path: 'blogs',
        loadChildren: () => import('./views/blogs/routes').then((m) => m.routes),
        canActivate: [authGuard]
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
