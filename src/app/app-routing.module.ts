import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {UserLayoutComponent} from './shared/components/layouts/user-layout/user-layout.component';
import {BlankLayoutComponent} from './shared/components/layouts/blank-layout/blank-layout.component';


const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule )
      }
    ]
  },
  
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children:[
      {
        path: 'courses',
        loadChildren: () => import('./views/courses/courses.module').then(m => m.CoursesModule )
      },
      {
        path: 'categories',
        loadChildren: () => import('./views/categories/categories.module').then(m => m.CategoriesModule )
      }
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children:[
      {
        path: 'courses',
        loadChildren: () => import('./views/courseview/courseview.module').then(m => m.CourseviewModule )
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
