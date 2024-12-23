import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Blogs'
    },
    children: [
      {
        path: '',
        redirectTo: 'blogs',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./components/create-blog/create-blog.component').then(m => m.CreateBlogComponent),
        data: {
          title: 'Blogs'
        }
      }
    ]
  }
];
