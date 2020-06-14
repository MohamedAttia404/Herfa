import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient  , HttpParams} from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventviewService {
  prev: string="";
  next: string ="";
  constructor(private http: HttpClient) { }

  parseLinks(links){
    this.prev=links.prev;
    this.next=links.next;
  }
  search(data){
    return this.http.get(`${ environment.apiUrl }/api/search/${data}`);
  }
  // get all events
  public getAll(){
    console.log("getAll");
    return this.http.get(`${ environment.apiUrl }/api/events`, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), tap((res: any) => {
      console.log(res.body.data);
      this.parseLinks(res.body.links);
    }));
    // return this.http.get(this._productApi);
  }
  public sendGetRequestToUrl(url: string){
    return this.http.get(url, { observe: "response"}).pipe(retry(3), tap((res:any) => {
      console.log(res);
      this.parseLinks(res.body.links);
  
    }));
  }
   // Delete event
   delete(id){
    return this.http.delete(`${ environment.apiUrl }/api/events/${id}`);
  }

  // Add new event
  add(data){
    return this.http.post(`${ environment.apiUrl }/api/events`,data);
  }

  //Get event
  getEvent(id){
    return this.http.get(`${ environment.apiUrl }/api/events/${id}`);
  }

  // Edit event
  update(data, id){
    return this.http.put(`${ environment.apiUrl }/api/events/${id}`,data);
  }

}
