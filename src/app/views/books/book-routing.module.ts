import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ManageBookComponent} from './manage-book/manage-book.component';
import {BorrowedBookListComponent} from './borrowed-book-list/borrowed-book-list.component';
import {ReturnedBooksComponent} from './returned-books/returned-books.component';
import {authGuard} from '../../services/guard/auth.guard';
import {BookDetailsComponent} from './book-details/book-details.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./book-list/book-list.component').then(m => m.BookListComponent),
        canActivate: [authGuard]
      },
      {
        path: 'my-books',
        loadComponent: () => import('../books/my-books/my-books.component').then(m => m.MyBooksComponent),
        canActivate: [authGuard]
      },
      {
        path: 'my-borrowed-books',
        component: BorrowedBookListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-returned-books',
        component: ReturnedBooksComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:bookId',
        component: BookDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageBookComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:bookId',
        component: ManageBookComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class BookRoutingModule {
// }
