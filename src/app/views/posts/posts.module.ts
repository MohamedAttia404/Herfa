import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HeaderComponent } from '../header/header.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';


@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent, AddCommentComponent, EditCommentComponent ],//HeaderComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule
  ]
})
export class PostsModule { }
