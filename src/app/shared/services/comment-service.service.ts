import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private _httpClient: HttpClient) { }
  //===========================================================

  private headers = new HttpHeaders({
    // 'Content-Type':'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization':localStorage.getItem("ACCESS_TOKEN"),
    
  });
//==========================================================================

  public addComment(post_id, comment){
    console.log("add "+comment);
    
    return this._httpClient.post(`${ environment.apiUrl }/api/${post_id}/comments`,comment, {
      headers: this.headers,
      });
  }
  //==========================================================================

  public updateComment(post_id, comment_id, comment){
    console.log("service" + comment);
    
    return this._httpClient.put(`${ environment.apiUrl }/api/${post_id}/comments/${comment_id}`,comment,
    {
      headers: this.headers,
    });
  }

  //==========================================================================

  getCommentById(post_id, comment_id){
    return this._httpClient.get(`${ environment.apiUrl }/api/${post_id}/comments/${comment_id}`,  {
      headers: this.headers,
      });
  }

  //=========================================================================
  deleteComment(post_id, comment_id){
    return this._httpClient.delete(`${ environment.apiUrl }/api/${post_id}/comments/${comment_id}`,  {
      headers: this.headers,
      });
  }
  

}
