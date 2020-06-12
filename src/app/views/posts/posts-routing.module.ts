import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';


const routes: Routes = [
  {
    path:'',
    component: PostsListComponent,
  },
  {
    path: 'edit/:id',
    component: EditPostComponent
  },
  {
    path:'new',
    component: AddPostComponent
  },
  {
    path:':id/add-comment',
    component: AddCommentComponent
  },
  {
    path: ':post_id/edit-comment/:comment_id',
    component: EditCommentComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
