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
    'Content-Type':'application/json',
    'Authorization':localStorage.getItem("ACCESS_TOKEN"),
    
  });
//==========================================================================

public addComment(post_id, comment){
  return this._httpClient.post(`${ environment.apiUrl }/api/${post_id}/comments`,comment, {
    headers: this.headers,
    });
}
}
