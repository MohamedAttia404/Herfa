import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  prev: string="";
  next: string ="";

  // private headers = new HttpHeaders({
  //   'Content-Type':'application/json',
  //   'Authorization':localStorage.getItem("ACCESS_TOKEN"),
    
  //   }); 

  // private _courseApi="http://127.0.0.8000/api/courses";

  constructor(private http: HttpClient) { }


  parseLinks(links){
    this.prev=links.prev;
    this.next=links.next;
  }  

  // get all courses
  public getAll(){
    console.log("getAll");

    return this.http.get(`${ environment.apiUrl }/api/courses`, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), tap((res: any) => {
      console.log(res.body.data);
      this.parseLinks(res.body.links);
    }));
    // return this.http.get(this._courseApi);
  }


  public sendGetRequestToUrl(url: string){
    return this.http.get(url, { observe: "response"}).pipe(retry(3), tap((res:any) => {
      console.log(res);
      this.parseLinks(res.body.links);
  
    }));
  }

  // Delete Course
  delete(id){
    return this.http.delete(`${ environment.apiUrl }/api/courses/${id}`);
  }

  // Add new course
  add(data){
    return this.http.post(`${ environment.apiUrl }/api/courses`,data );
  }

  //Get course
  getCourse(id){
    return this.http.get(`${ environment.apiUrl }/api/courses/${id}`);
  }

  // Edit Courses
  update(data, id){
    return this.http.put(`${ environment.apiUrl }/api/courses/${id}`,data);
  }

}
