import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  first: string="";
  prev: string="";
  next: string ="";
  last: string="";

  constructor(private _httpClient: HttpClient) { }
//=============================================================================

  parseLink(links){
    this.first=links.first;
    this.prev=links.prev;
    this.next=links.next;
    this.last=links.last
  }
//==========================================================================

  public getPosts(){
    console.log("get posts service");
    return this._httpClient.get(`${ environment.apiUrl }/api/posts`);
  }
//=============================================================================

  public addPost(post){
    return this._httpClient.post(`${ environment.apiUrl }/api/posts`,post);
  }


}
